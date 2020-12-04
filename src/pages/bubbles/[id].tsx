import React, { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { toast } from 'react-toastify';
import Router from "next/router";

import { Bubble, Label, Comment } from "@prisma/client";
import prisma from '../../../prisma/client';
import api from '../../services/api';

import BubbleDetails from "../../components/BubbleDetails/BubbleDetails";

import 'react-toastify/dist/ReactToastify.css';
toast.configure()

export const getStaticPaths: GetStaticPaths = async () => {
  const bubbles = await prisma.bubble.findMany({
    select: {
      id: true
    },
  });
  const paths = bubbles.map((bubble) => ({ params: { id: `${bubble.id}` }}))

  return { paths: paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const bubble = await prisma.bubble.findUnique({
    include: {
      labels: true,
      comments: {
        include: {
          author: {
            select: {
              avatarUrl: true,
              name: true,
            },
          },
        },
      },
      author: {
        select: {
          avatarUrl: true,
        },
      },
    },
    where: {
      id: parseInt(params.id as string)
    },
  });

  const labels = await prisma.label.findMany()

  const serializableBubble = {
    ...bubble,
    createdAt: bubble.createdAt.toString(),

    comments: bubble.comments.map(comment => ({
      ...comment,
      createdAt: comment.createdAt.toString(),
    })),
  };
  
  return { props: { bubble: serializableBubble, labels } };
};

type FilledComment = Comment & {
  author: {
    avatarUrl: string;
    name: string;
  }
}

type FilledBubble = Bubble & {
  labels: Label[],
  comments: FilledComment[],
  author: {
      avatarUrl: string;
  };
};

type Props = {
  bubble: FilledBubble,
  labels: Label[];
};

const BubblePage: React.FC<Props> = (props: Props) => {
  const [ bubble, setBubble ] = useState<FilledBubble>(props.bubble)

  useEffect(() => {
    setBubble({
      ...props.bubble,
      createdAt: new Date(props.bubble.createdAt),
    });
  }, []);

  const postComment = async (e, userComment, userInfo) => {
    e.preventDefault();

    const content = userComment;
    const author = userInfo;
    const bubbleId = bubble.id;
  
    try {
      await api.post('/comments', {
        content,
        author,
        bubbleId,
      });
      toast.success('Comment registered!', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      })
      Router.reload();

    } catch {
      toast.error('Registration error! Try again', {
        autoClose: 2500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      })
      Router.reload();
    };
  };

  const postLabel = async (e, newLabel) => {
    e.preventDefault();

    const name = newLabel.name;
    const description = newLabel.description;
    const color = newLabel.color;
    const bubbleId = bubble.id;
  
    try {
      await api.post('/labels', {
        name,
        description,
        color,
        bubbleId,
      });
      toast.success('Label registered!', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      })
      Router.reload();

    } catch {
      toast.error('Registration error! Try again', {
        autoClose: 2500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      })
      Router.reload();
    };
  };

  const alterateLabel = async (e, id, selectedLabel) => {
    e.preventDefault();

    const bubbleId = bubble.id;
    const labelId = id;
    const isSelectedLabel = selectedLabel;
  
    try {
      await api.put(`/labels/${labelId}`, {
        bubbleId,
        labelId,
        isSelectedLabel,
      });
      toast.success('Label altered!', {
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      Router.reload();

    } catch {
      toast.error('Alteration error! Try again', {
        autoClose: 2500,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
      });
      Router.reload();
    };
  };

  return(
    <BubbleDetails 
      onClose={() => Router.push('/')}
      bubble={bubble}
      allLabels={props.labels}
      onSubmitNewComment={postComment}
      onSubmitNewLabel={postLabel}
      onConfigChange={alterateLabel}
    />
  );
};

export default BubblePage