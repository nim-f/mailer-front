'use client';
import React, {
  use,
  useOptimistic,
  useFormStatus,
  useActionState,
  createContext
} from 'react';

import './button.css';

const ThemeContext = createContext('light');

const fakeVote = async (prevState, formData) => {
  const vote = formData.get('vote');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (vote === 'invalid') throw new Error('Invalid vote');
  return vote;
};

const voteData = new Promise((resolve) => {
  setTimeout(() => resolve({ upvotes: 100, downvotes: 40 }), 1000);
});

function Button() {
  const { pending } = useFormStatus();
  return (
    <button className="button" type="submit" disabled={pending}>
      {pending ? 'Voting...' : 'Vote'}
    </button>
  );
}

function VotingApp() {
  const theme = use(ThemeContext);
  const data = use(voteData);

  const [state, formAction, isPending] = useActionState(fakeVote, null);
  const [optimisticVotes, addOptimisticVote] = useOptimistic(data, (current, newVote) => {
    if (newVote === 'up') {
      return { ...current, upvotes: current.upvotes + 1 };
    }
    if (newVote === 'down') {
      return { ...current, downvotes: current.downvotes + 1 };
    }
    return current;
  });

  return (
    <form
      action={async (formData) => {
        const vote = formData.get('vote');
        try {
          addOptimisticVote(vote);
          await formAction(formData);
        } catch (err) {
          alert(err.message);
        }
      }}
      style={{ fontFamily: 'sans-serif' }}
    >
      <h2 style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Vote Your Opinion</h2>
      <p>👍 {optimisticVotes.upvotes} | 👎 {optimisticVotes.downvotes}</p>
      <div>
        <input type="hidden" name="vote" value="up" />
        <Button />
      </div>
      <div>
        <input type="hidden" name="vote" value="down" />
        <Button />
      </div>
    </form>
  );
}

export default function App() {
  return (
    <ThemeContext value="dark">
      <VotingApp />
    </ThemeContext>
  );
}
