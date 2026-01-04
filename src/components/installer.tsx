'use client';

// import { track } from "@vercel/analytics/react";
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GithubButton } from '@/components/ui/github-button';

const CODE = 'pip install brinicle';
const TIMEOUT = 2000;

export const Installer = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    if (typeof window === 'undefined' || !navigator.clipboard.writeText) {
      return;
    }

    try {
      await navigator.clipboard.writeText(CODE);
      setIsCopied(true);
      // track("Copied installer code");
      setTimeout(() => setIsCopied(false), TIMEOUT);
    } catch (_error) {}
  };

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <div className="flex w-fit flex-col gap-y-4">
      <div
        className="group  px-10 relative flex cursor-default items-center gap-2 rounded-sm border bg-background text-foreground"
        onClick={copyToClipboard}
        role="button"
        tabIndex={0}
      >
        <pre className="group-hover:!text-foreground w-full whitespace-pre-wrap py-2 text-center font-semibold text-sm transition-all dark:text-muted-foreground">
          {CODE}
        </pre>
        <Button
          className="!bg-transparent absolute right-0 rounded-xs text-muted-foreground group-hover:text-foreground"
          onClick={copyToClipboard}
          size="icon"
          variant="ghost"
        >
          <Icon className="h-4 w-4" />
        </Button>
      </div>
      <GithubButton
        repoUrl="https://github.com/bicardinal/brinicle"
        variant="default"
        size="default"
        label="Star on GitHub"
        showGithubIcon={true}
        showStarIcon={true}
        targetStars={0}
        autoAnimate={false}
      />
    </div>
  );
};