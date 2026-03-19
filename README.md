# Mazier

A maze generator built with graph theory and Depth-First Search.

I built this project as a way to learn graph theory. After reading some articles and watching tutorials, I had a basic understanding of graphs and graph traversal but wanted to solidify that knowledge by building something tangible. The idea was simple: if a grid can be represented as a graph, then a randomized Depth-First Search through that graph should carve out a maze. That turned out to be true, and Mazier is the result.

## How the Maze Generation Works

The core of Mazier is a maze generation algorithm that has nothing to do with the frontend. It takes a grid size, builds a graph, runs a randomized DFS, and returns an ordered list of cells that form the maze paths. Here's each step in detail.

### 1. Representing the Grid as a Graph

A `Graph` class stores vertices and edges using an adjacency list (a `Map<string, Set<string>>`). Every edge is undirected, meaning if vertex A connects to vertex B, then B also connects back to A.

To build the maze grid, Mazier creates `h × w` vertices numbered `0` through `(h × w) - 1` in **column-major order**. The index increases going down each column first, then moves to the next column. Given a vertex index `i`, its position in the grid is

```
x (column) = floor(i / h)
y (row)    = i % h
```

Each vertex is connected to its **bottom neighbor** (`i + 1`) if it isn't at the bottom of its column, and to its **right neighbor** (`i + h`) if it isn't in the rightmost column. For a 4×4 grid, this produces

```
 0 — 4 — 8  — 12
 |   |   |    |
 1 — 5 — 9  — 13
 |   |   |    |
 2 — 6 — 10 — 14
 |   |   |    |
 3 — 7 — 11 — 15
```

Every cell is now a vertex with edges to its direct neighbors, forming a fully connected grid graph.

### 2. Picking a Random Perimeter Start

DFS needs a starting vertex. Initially I hardcoded `0` (the top-left corner), but that made the mazes look repetitive. The fix was to collect all cells on the four outer borders of the grid (left, right, top, bottom) and pick one at random. Starting from different perimeter positions makes the DFS explore different paths, producing more varied mazes each time.

### 3. Randomized Depth-First Search

The DFS is recursive. At each vertex, its neighbors are shuffled into a random order, and the algorithm recurses into each unvisited neighbor one by one. This randomness is what makes every maze unique.

The tricky part was figuring out how to record the traversal in a way that the renderer can draw correctly. It took three iterations to get right.

- **Iteration 1** recorded vertices in plain pre-order. The problem was that when DFS backtracks, the next recorded vertex isn't necessarily a neighbor of the previous one, causing the drawn path to jump across the grid.
- **Iteration 2** inserted a dead-end marker (`"DE"`) after every recursive call. This fixed the jumping, but created too many line breaks, resulting in a maze full of short, disconnected segments.
- **Iteration 3** (the current solution) only inserts a `"DE"` when it's actually needed. Before recording a vertex, it checks whether the previous vertex in the list is a neighbor. If it is, the path continues. If not, a `"DE"` is inserted first to signal a line break. This produces long, winding corridors with breaks only at real dead ends.

The output is a simple `string[]` like `["0", "1", "5", "DE", "9", "13", ...]` where each string is a vertex index and `"DE"` marks where the path should break.

### 4. Rendering

The rendering step draws the output onto an HTML canvas. It iterates through the order array, drawing lines between consecutive cell centers. When it hits a `"DE"`, it lifts the pen and starts a new line from the next cell. The gaps between line segments become the walls of the maze.

## Tech Stack

- TypeScript
- React 19, Vite 8, Tailwind CSS 4
- HTML Canvas API

## Project Structure

```
src/
├── utils/
│   └── graph.utils.ts      # Graph class (adjacency list)
├── services/
│   └── maze.service.ts     # Grid creation and DFS algorithm
├── hooks/
│   ├── useMaze.ts           # Hook for maze generation and state
│   └── useCanvas.ts         # Hook for canvas context setup
├── components/
│   └── Maze.tsx             # Canvas rendering and UI controls
├── pages/
│   ├── Home.tsx
│   └── About.tsx
├── app.tsx                  # App layout
├── main.tsx                 # Entry point with routing
└── index.css                # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm

### Install and Run

```bash
git clone https://github.com/sihilelh/mazier.git
cd maze

pnpm install

pnpm dev
```

### Build for Production

```bash
pnpm build
pnpm preview
```

## Usage

- Set the grid width (W) and height (H) using the input fields.
- Click **Generate** to create a new maze.
- Click the download button on the canvas to save the maze as a PNG.

## Further Reading

For a deeper write-up on the graph theory concepts and the full iterative development of the DFS algorithm with code examples, see [my blog post](https://sihilel.com/blog/mazier-a-maze-generator).
