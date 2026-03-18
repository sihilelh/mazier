import { Link } from "react-router-dom";
import { Github, ArrowLeft } from "lucide-react";

export function About() {
  return (
    <div className="max-w-[520px] w-full text-sm font-mono text-ink/80 leading-relaxed space-y-4">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-muted text-xs hover:text-ink transition-colors duration-150 no-underline mb-2"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h2 className="text-base font-mono text-ink font-bold tracking-wide">About Mazier</h2>

      <p>
        <strong className="text-ink">Mazier</strong> is a maze generator built with randomized
        depth-first search. Each maze is a spanning tree of a grid graph — the algorithm walks
        the grid, randomly picking unvisited neighbors, backtracking at dead ends until every
        cell is connected.
      </p>

      <p>
        Made by <strong className="text-ink">Sihilel H</strong> while learning graph theory
        basics one afternoon. The realization: a DFS with randomized neighbor selection
        naturally produces mazes. The algorithm was written by hand (no AI) as an educational
        exercise; the UI was built with AI assistance since the frontend stack was already
        familiar.
      </p>

      <h3 className="text-sm font-mono text-ink font-bold pt-2">How it works</h3>

      <ol className="list-decimal list-inside space-y-1.5 text-ink/70">
        <li>Build a grid graph where each cell is a vertex connected to its neighbors</li>
        <li>Pick a starting cell and begin a depth-first traversal</li>
        <li>At each step, randomly shuffle the unvisited neighbors before recursing</li>
        <li>Backtrack when hitting dead ends — the visited path forms a spanning tree</li>
        <li>Draw lines between cell centers following the DFS visit order</li>
      </ol>

      <div className="pt-2">
        <a
          href="https://github.com/sihilelh/mazier"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-ink/60 hover:text-accent transition-colors duration-150 no-underline"
        >
          <Github size={14} />
          sihilelh/mazier
        </a>
      </div>
    </div>
  );
}
