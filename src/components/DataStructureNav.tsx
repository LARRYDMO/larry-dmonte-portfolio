"use client";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type StructureMode = 'array' | 'stack' | 'queue' | 'tree';
interface Item { label: string; href: string; }
interface DataStructureNavProps { items: Item[]; className?: string; }

const modes: { mode: StructureMode; label: string; hint: string }[] = [
	{ mode: 'array', label: 'Doubly List', hint: 'Bidirectional traversal' },
	{ mode: 'stack', label: 'Stack', hint: 'LIFO' },
	{ mode: 'queue', label: 'Queue', hint: 'FIFO' },
	{ mode: 'tree', label: 'Tree', hint: 'Hierarchy' },
];

export default function DataStructureNav({ items, className = '' }: DataStructureNavProps) {
	const [mode, setMode] = useState<StructureMode>('array');

	// Doubly list (array) state
	const [arrayItems, setArrayItems] = useState<Item[]>(() => [...items]);
	const [arrayPtr, setArrayPtr] = useState(0);

	// Stack
	const [stackItems, setStackItems] = useState<Item[]>(() => [...items]);
	const popStack = () => setStackItems(s => s.slice(0, -1));
	const pushStack = () => setStackItems(s => s.length < items.length ? [...s, items[s.length]] : s);
	const resetStack = () => setStackItems([...items]);

	// Queue (prefill with all items by default)
	const [queueItems, setQueueItems] = useState<Item[]>(() => [...items]);
	const enqueue = () => setQueueItems(q => {
		if (q.length >= items.length) return q;
		// if empty, push the first item
		if (q.length === 0) return [items[0]];
		// find the original index of the current tail and append the next one circularly
		const tail = q[q.length - 1];
		const tailIdx = items.findIndex(it => it.href === tail.href);
		const nextIdx = (tailIdx + 1) % items.length;
		// safety: if next item is already present (shouldn't happen when q.length < items.length), find first missing
		if (q.some(it => it.href === items[nextIdx].href)) {
			const missing = items.find(it => !q.some(qi => qi.href === it.href));
			return missing ? [...q, missing] : q;
		}
		return [...q, items[nextIdx]];
	});
	const dequeue = () => setQueueItems(q => q.slice(1));
	const resetQueue = () => setQueueItems([...items]);

	// Tree traversal (fixed set, no mutation)
	const [treeTraverseIndex, setTreeTraverseIndex] = useState(0);
	const treeNext = () => setTreeTraverseIndex(i => (i < items.length - 1 ? i + 1 : i));
	const treeReset = () => setTreeTraverseIndex(0);

	// Re-init on items change
	useEffect(()=>{ setArrayItems([...items]); setArrayPtr(0); resetStack(); resetQueue(); treeReset(); }, [items]);

	// Tree levels memo
	const treeLevels = useMemo(()=>{
		const levels: Item[][] = []; let i=0, size=1;
		while(i < items.length) { levels.push(items.slice(i, i+size)); i+=size; size*=2; }
		return levels;
	}, [items]);

	const activeModeBtn = (m: typeof modes[number]) => {
		const active = m.mode === mode;
		return (
			<button
				key={m.mode}
				onClick={()=>setMode(m.mode)}
				className={`relative text-[11px] px-3 py-1.5 rounded-full border transition ${active ? 'bg-gradient-to-r from-sky-500/30 to-indigo-500/30 text-sky-100 border-sky-500/60' : 'text-slate-400/80 border-slate-700/70 hover:text-sky-200 hover:border-sky-500/40'}`}
			>{m.label}</button>
		);
	};

	return (
		<div className={`ds-nav-wrapper ${className}`}>
			<div className="flex flex-wrap items-center gap-2 mb-4">
				<span className="text-[11px] tracking-wider uppercase text-slate-500">View As:</span>
				<div className="flex flex-wrap gap-2">{modes.map(activeModeBtn)}</div>
			</div>
					<div className="relative w-full">
				<AnimatePresence mode="wait">
					{mode === 'array' && (
								<motion.div key="array" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }} className="border border-slate-700/60 bg-slate-900/30 rounded-xl p-5 w-full flex flex-col gap-4">
							<div className="flex flex-wrap items-center gap-3 text-[11px]">
								<button onClick={()=> setArrayPtr(p=> p>0? p-1:p)} disabled={arrayPtr===0} className={`px-3 py-1.5 rounded-md border ${arrayPtr===0?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-sky-500/60 hover:text-sky-200 text-slate-300'} transition`}>Prev</button>
								<button onClick={()=> setArrayPtr(p=> p<arrayItems.length-1? p+1:p)} disabled={arrayPtr===arrayItems.length-1} className={`px-3 py-1.5 rounded-md border ${arrayPtr===arrayItems.length-1?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-sky-500/60 hover:text-sky-200 text-slate-300'} transition`}>Next</button>
								<button onClick={()=> setArrayPtr(0)} disabled={arrayPtr===0} className={`px-3 py-1.5 rounded-md border ${arrayPtr===0?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-fuchsia-500/60 hover:text-fuchsia-200 text-slate-300'} transition`}>Reset Ptr</button>
								<span className="text-[10px] tracking-wide text-slate-500">Ptr: {arrayPtr}</span>
								<span className="text-[10px] tracking-wide text-slate-500 ml-2">Length: {arrayItems.length}</span>
							</div>
											  <div className="flex items-center justify-start px-1 gap-0 flex-nowrap">
												{arrayItems.map((it,i) => {
									const active = i === arrayPtr;
									const visited = i < arrayPtr;
									return (
										<div key={it.href} className="flex items-center">
															<div className="w-[96px] flex items-center justify-center">
												<NavBox item={it} disabled={!active} className={`w-full ${active ? 'ring-1 ring-sky-500/50 shadow-[0_0_0_1px_rgba(56,189,248,0.35)] animate-[pulse_2.4s_ease-in-out_infinite]': visited ? 'opacity-60' : ''}`} />
											</div>
															{i < arrayItems.length -1 && <ArrowBoth className="mx-2" />}
										</div>
									);
								})}
							</div>
						</motion.div>
					)}
								{mode === 'stack' && (
									<motion.div key="stack" initial={{ opacity:0,x:-12 }} animate={{ opacity:1,x:0 }} exit={{ opacity:0,x:12 }} className="border border-slate-700/60 bg-slate-900/30 rounded-xl p-5 flex flex-col gap-5 w-full">
							<div className="flex flex-wrap items-center gap-3 text-[11px]">
								<button onClick={pushStack} disabled={stackItems.length===items.length} className={`px-3 py-1.5 rounded-md border ${stackItems.length===items.length?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-emerald-500/60 hover:text-emerald-200 text-slate-300'} transition`}>Push</button>
								<button onClick={popStack} disabled={stackItems.length===0} className={`px-3 py-1.5 rounded-md border ${stackItems.length===0?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-sky-500/60 hover:text-sky-200 text-slate-300'} transition`}>Pop</button>
								<button onClick={resetStack} disabled={stackItems.length===items.length} className={`px-3 py-1.5 rounded-md border ${stackItems.length===items.length?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-fuchsia-500/60 hover:text-fuchsia-200 text-slate-300'} transition`}>Reset</button>
								<span className="text-[10px] tracking-wide text-slate-500">Size: {stackItems.length}</span>
							</div>
							<div className="relative flex flex-col items-stretch w-full min-h-[220px] pt-2">
								<AnimatePresence initial={false} mode="popLayout">
									{stackItems.length === 0 && <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center text-[11px] text-slate-500 py-6">Stack Empty</motion.div>}
									{stackItems.slice().reverse().map((it, idx) => {
										const isTop = idx === 0;
										return (
											<motion.div key={it.href} layout initial={{ y:32, opacity:0, scaleY:0.5 }} animate={{ y:0, opacity:1, scaleY:1 }} exit={{ y:36, opacity:0, scaleY:0.4 }} className="mb-2 last:mb-0 relative origin-bottom flex flex-col items-center">
												{isTop && <span className="mb-1 text-[9px] tracking-wide text-sky-400 select-none">Top</span>}
												<NavBox item={it} compact disabled={!isTop} className={`${isTop?'ring-1 ring-sky-500/40 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]':''}`} />
												{!isTop && <div className="absolute inset-0 rounded-lg bg-slate-900/45 pointer-events-none border border-slate-700/50" aria-hidden />}
											</motion.div>
										);
									})}
								</AnimatePresence>
								<div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900/70 to-transparent" />
							</div>
						</motion.div>
					)}
								{mode === 'queue' && (
									<motion.div key="queue" initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-12 }} className="flex flex-col gap-4 w-full border border-slate-700/60 bg-slate-900/30 rounded-xl p-5">
							<div className="flex flex-wrap items-center gap-3 text-[11px]">
								<button onClick={enqueue} disabled={queueItems.length===items.length} className={`px-3 py-1.5 rounded-md border ${queueItems.length===items.length?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-emerald-500/60 hover:text-emerald-200 text-slate-300'} transition`}>Enqueue</button>
								<button onClick={dequeue} disabled={queueItems.length===0} className={`px-3 py-1.5 rounded-md border ${queueItems.length===0?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-sky-500/60 hover:text-sky-200 text-slate-300'} transition`}>Dequeue</button>
								<button onClick={resetQueue} disabled={queueItems.length===items.length} className={`px-3 py-1.5 rounded-md border ${queueItems.length===items.length?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-fuchsia-500/60 hover:text-fuchsia-200 text-slate-300'} transition`}>Reset</button>
								<span className="text-[10px] tracking-wide text-slate-500">Size: {queueItems.length}</span>
							</div>
							<div className="relative pt-5 pb-5">
								<div className="flex flex-wrap items-end gap-3">
									<AnimatePresence initial={false}>
										{queueItems.map((it, idx) => {
											const isHead = idx === 0; const isTail = idx === queueItems.length - 1;
											return (
												<motion.div key={it.href} layout initial={{x:24, opacity:0}} animate={{x:0, opacity:1}} exit={{y:-24, opacity:0}} className="relative flex items-center">
													<div className="relative flex flex-col items-center">
														{isHead && <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] tracking-wide text-sky-400 select-none">Head</span>}
														<NavBox item={it} compact disabled={!isHead} className={`${isHead? 'ring-1 ring-sky-500/40 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]':''}`} />
														{isTail && <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] tracking-wide text-emerald-400 select-none">Tail</span>}
													</div>
													{!isTail && <ArrowRight className="ml-2" />}
												</motion.div>
											);
										})}
										{queueItems.length===0 && <motion.div key="emptyQ" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-[11px] text-slate-500 py-4">Queue Empty</motion.div>}
									</AnimatePresence>
								</div>
							</div>
						</motion.div>
					)}
								{mode === 'tree' && (
									<motion.div key="tree" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="flex flex-col gap-6 border border-slate-700/60 bg-slate-900/30 rounded-xl p-5 w-full">
							<div className="flex flex-wrap items-center gap-3 text-[11px]">
								<button onClick={treeNext} disabled={treeTraverseIndex>=items.length-1} className={`px-3 py-1.5 rounded-md border ${treeTraverseIndex>=items.length-1?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-sky-500/60 hover:text-sky-200 text-slate-300'} transition`}>Next</button>
								<button onClick={treeReset} disabled={treeTraverseIndex===0} className={`px-3 py-1.5 rounded-md border ${treeTraverseIndex===0?'opacity-40 cursor-not-allowed border-slate-700':'border-slate-600 hover:border-amber-500/60 hover:text-amber-200 text-slate-300'} transition`}>Reset</button>
								<span className="text-[10px] tracking-wide text-slate-500">Current: {treeTraverseIndex} / {items.length-1}</span>
							</div>
							<div className="flex flex-col gap-6">
								{treeLevels.map((level, li) => (
									<div key={li} className="tree-level relative flex justify-center gap-6">
										{level.map((it, idx) => {
											const flatIndex = treeLevels.slice(0, li).reduce((acc,l)=>acc+l.length,0)+idx;
											const active = flatIndex === treeTraverseIndex;
											return (
												<div key={it.href} className="relative flex flex-col items-center">
													<NavBox item={it} compact disabled={!active} className={`${active?'ring-1 ring-sky-500/50 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]':''}`} />
													{li < treeLevels.length - 1 && <ArrowDown />}
												</div>
											);
										})}
									</div>
								))}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}

function NavBox({ item, compact=false, disabled=false, className='' }: { item: Item; compact?: boolean; disabled?: boolean; className?: string; }) {
	const base = `relative group inline-flex items-center justify-center rounded-lg border ${disabled ? 'border-slate-700/40 bg-slate-800/30' : 'border-slate-700/60 bg-slate-800/40 hover:border-sky-500/50 hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35)]'} px-4 ${compact ? 'py-2' : 'py-3'} min-w-[72px] text-xs font-medium tracking-wide ${disabled?'text-slate-500':'text-slate-200 group-hover:text-white'} transition-colors ${className}`;
	const isExternal = item.href.startsWith('http') || item.href.endsWith('.pdf');
	if (disabled) return <div className={base} aria-disabled>{item.label}</div>;
	if (isExternal) return <a href={item.href} target="_blank" rel="noreferrer" className={base}>{item.label}</a>;
	return <Link href={item.href} className={base}>{item.label}</Link>;
}

function ArrowRight({ className = '' }: { className?: string }) {
	return (
		<svg className={`w-4 h-4 text-slate-600/60 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
			<path d="M4 12h14" />
			<polyline points="14,6 20,12 14,18" />
		</svg>
	);
}
function ArrowDown({ className = '' }: { className?: string }) {
	return (
		<svg className={`w-4 h-6 text-slate-600/60 mt-2 mb-1 ${className}`} viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
			<path d="M12 0v26" />
			<polyline points="6,18 12,26 18,18" />
		</svg>
	);
}
function ArrowBoth({ className = '' }: { className?: string }) {
	return (
		<svg className={`w-10 h-4 text-slate-600/50 ${className}`} viewBox="0 0 64 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
			<path d="M8 12h48" />
			<polyline points="48,6 56,12 48,18" />
			<polyline points="16,6 8,12 16,18" />
		</svg>
	);
}
