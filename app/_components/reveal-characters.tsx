import type { CSSProperties } from "react";

export function RevealCharacters({ children, offset = 0 }: { children: string; offset?: number }) {
  let characterIndex = 0;

  return children.split(/(\s+)/).map((token, tokenIndex) => {
    if (/^\s+$/.test(token)) {
      characterIndex++;
      return " ";
    }

    return (
      <span className="reveal-word" key={`word-${tokenIndex}`}>
        {Array.from(token).map((character, characterPosition) => {
          const index = characterIndex++;
          return (
            <span className="reveal-character" style={{ "--reveal-index": index + offset } as CSSProperties} aria-hidden="true" key={characterPosition}>
              {character}
            </span>
          );
        })}
      </span>
    );
  });
}
