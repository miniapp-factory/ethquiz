"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { title, description, url } from "@/lib/metadata";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: `${url}/icon.png`,
        ogTitle: title,
        ogDescription: description,
        ogImageUrl: `${url}/icon.png`,
        button: {
          title: "Launch Mini App",
          action: {
            type: "launch_miniapp",
            name: title,
            url: url,
            splashImageUrl: `${url}/icon.png`,
            iconUrl: `${url}/icon.png`,
            splashBackgroundColor: "#000000",
            description: description,
            primaryCategory: "utility",
            tags: [],
          },
        },
      }),
    },
  };
}

const questions = [
  {
    question: "What EIP introduced account abstraction?",
    options: ["EIP-1559", "EIP-4337", "EIP-3074", "EIP-2938"],
    answerIndex: 1,
  },
  {
    question: "Beacon Chain validator min ETH?",
    options: ["16 ETH", "32 ETH", "64 ETH", "128 ETH"],
    answerIndex: 1,
  },
  {
    question: "Which EIP introduced EIP-1559 fee market?",
    options: ["EIP-1559", "EIP-3074", "EIP-2938", "EIP-4337"],
    answerIndex: 0,
  },
  {
    question: "What is the maximum block gas limit on Ethereum?",
    options: ["10 million", "30 million", "100 million", "200 million"],
    answerIndex: 1,
  },
  {
    question: "Which protocol is used for Ethereum's consensus?",
    options: ["Proof of Work", "Proof of Stake", "Delegated Proof of Stake", "Proof of Authority"],
    answerIndex: 1,
  },
  {
    question: "What is the name of Ethereum's layer 2 scaling solution that uses rollups?",
    options: ["Optimistic Rollups", "ZK Rollups", "State Channels", "Sidechains"],
    answerIndex: 0,
  },
  {
    question: "Which EIP introduced the concept of 'EIP-155' for transaction replay protection?",
    options: ["EIP-155", "EIP-1559", "EIP-2938", "EIP-3074"],
    answerIndex: 0,
  },
  {
    question: "What is the native token of Ethereum?",
    options: ["ETH", "BTC", "LTC", "XRP"],
    answerIndex: 0,
  },
  {
    question: "Which EIP introduced the ERC-20 token standard?",
    options: ["EIP-20", "EIP-721", "EIP-1155", "EIP-2612"],
    answerIndex: 0,
  },
  {
    question: "What is the maximum number of accounts on Ethereum?",
    options: ["Unlimited", "1 million", "10 million", "100 million"],
    answerIndex: 0,
  },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const startQuiz = () => {
    setStarted(true);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFeedback(null);
    setCompleted(false);
  };

  const handleOptionClick = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const correct = questions[current].answerIndex === index;
    if (correct) {
      setScore((prev) => prev + 1);
      setFeedback("Correct! 🎉");
    } else {
      setFeedback(
        `Wrong! 😔 Correct: ${questions[current].options[questions[current].answerIndex]}`
      );
    }
  };

  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => {
        if (current + 1 < questions.length) {
          setCurrent((prev) => prev + 1);
          setSelected(null);
          setFeedback(null);
        } else {
          setCompleted(true);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected, current]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <div className="max-w-3xl w-full p-4">
        <h1 className="text-3xl font-bold mb-4 text-center">{title}</h1>
        <p className="text-center mb-8">{description}</p>

        {!started && (
          <div className="flex flex-col items-center space-y-4">
            <Button onClick={startQuiz} size="lg">
              Start Quiz
            </Button>
          </div>
        )}

        {started && !completed && (
          <div className="space-y-4">
            <Progress value={(current + 1) / questions.length * 100} />
            <Card>
              <CardHeader>
                <CardTitle>{questions[current].question}</CardTitle>
                <CardDescription>{`Question ${current + 1} of ${questions.length}`}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                {questions[current].options.map((option, idx) => (
                  <Button
                    key={idx}
                    variant={selected === idx ? "secondary" : "outline"}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selected !== null}
                    className="w-full justify-start"
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
            </Card>
            {feedback && (
              <div className="mt-4 text-center text-lg font-medium">
                {feedback}
              </div>
            )}
          </div>
        )}

        {completed && (
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold">Quiz Complete!</h2>
            <p className="text-xl">{`Your score: ${score} / ${questions.length}`}</p>
            <Button onClick={startQuiz} size="lg">
              Retake Quiz
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
