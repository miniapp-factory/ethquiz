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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selected, current]);

  const share = () => {
    const text = `I scored ${score}/10 on ETHQUIZ! ⛓️ Super hard Ethereum quiz in /openxai—try beating it: https://ethquiz.miniapp-factory.marketplace.openxai.network`;
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    } catch {
      alert("Failed to copy link.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {!started && !completed && (
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,0,0.5)]">
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
          <Button
            className="bg-red-600 text-yellow-200 hover:bg-red-700 transition-colors"
            onClick={startQuiz}
          >
            Start Quiz
          </Button>
        </div>
      )}

      {started && !completed && (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <Progress
            value={((current + 1) / questions.length) * 100}
            className="w-full"
          />
          <Card className="w-full bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Question {current + 1}/{questions.length}
              </CardTitle>
              <CardDescription className="mt-2">
                {questions[current].question}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
              {questions[current].options.map((opt, idx) => {
                const isSelected = selected === idx;
                const isCorrect = questions[current].answerIndex === idx;
                const btnClass =
                  idx % 2 === 0
                    ? "bg-red-600 text-yellow-200"
                    : "bg-yellow-600 text-red-200";
                const selectedClass = isSelected
                  ? isCorrect
                    ? "border-4 border-green-500"
                    : "border-4 border-red-500"
                  : "";
                return (
                  <Button
                    key={idx}
                    className={`${btnClass} ${selectedClass} hover:scale-105 transition-transform`}
                    onClick={() => handleOptionClick(idx)}
                    disabled={selected !== null}
                  >
                    {opt}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
          {feedback && (
            <div className="mt-4 text-center text-lg font-medium">{feedback}</div>
          )}
        </div>
      )}

      {completed && (
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          <Card className="w-full bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Quiz Complete! ⛓️
              </CardTitle>
              <CardDescription className="mt-2 text-xl">
                Score: {score}/{questions.length}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-lg">
                {score >= 8
                  ? "Ethereum Genius! 🌟"
                  : score >= 5
                  ? "Solid Effort! 💪"
                  : "Keep Learning! 📚"}
              </p>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                onClick={startQuiz}
              >
                Play Again
              </Button>
              <Button
                className="bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                onClick={share}
              >
                Share on Farcaster
              </Button>
              <Button
                className="bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                onClick={copyLink}
              >
                Copy link
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
