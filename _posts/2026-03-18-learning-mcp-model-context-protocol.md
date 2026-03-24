---
title: "AI's New Way to Talk to Your Code: My First Look at MCP"
layout: post
date: 2026-03-18
image: assets/images/2026-03-18-learning-mcp-model-context-protocol/mcp-visual.svg
tags: [AI, MCP, Tools]
---

In today's world of AI and automation, making systems easy for both humans and machines to understand is becoming more important. Recently, I started learning about something called MCP (Model Context Protocol). At first, it looked like just another technical concept, but after a bit of exploring, it started to feel important.

<!-- Visual: How MCP Helps AI -->
<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 2rem 0;">
<svg width="400" height="220" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="60" width="110" height="50" rx="10" fill="#e0e7ff" stroke="#6366f1" stroke-width="2"/>
  <text x="65" y="90" font-size="14" text-anchor="middle" fill="#3730a3">AI</text>
  <rect x="280" y="30" width="110" height="50" rx="10" fill="#fef9c3" stroke="#f59e42" stroke-width="2"/>
  <text x="335" y="60" font-size="13" text-anchor="middle" fill="#b45309">API</text>
  <rect x="280" y="140" width="110" height="50" rx="10" fill="#d1fae5" stroke="#10b981" stroke-width="2"/>
  <text x="335" y="170" font-size="13" text-anchor="middle" fill="#047857">Docs</text>
  <rect x="150" y="95" width="90" height="30" rx="8" fill="#f3f4f6" stroke="#6b7280" stroke-width="2"/>
  <text x="195" y="115" font-size="12" text-anchor="middle" fill="#374151">MCP</text>
  <line x1="120" y1="85" x2="150" y2="110" stroke="#6366f1" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="240" y1="110" x2="280" y2="55" stroke="#f59e42" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="240" y1="110" x2="280" y2="165" stroke="#10b981" stroke-width="2" marker-end="url(#arrow)"/>
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#6b7280"/>
    </marker>
  </defs>
</svg>
<p style="text-align:center;font-size:13px;color:#555;margin-top:0.5em;margin-bottom:0;">MCP sits between AI and systems (like APIs and Docs), making it easier for AI to interact directly and get structured answers.</p>
</div>

## Why I Got Interested

As developers, we usually build APIs for apps and users. But now, AI is also becoming a “user”.

The problem is that AI usually works with prompts, not structured systems. That’s where MCP comes in.

## What MCP Is (Simple Idea)

MCP is a way to help AI connect with:

- APIs  
- Tools  
- Documentation  

in a structured and standard way.

Instead of guessing from text, AI can directly interact with systems.

## A Small Real Example

While working on integrating a payment gateway, I noticed something interesting.

They had:

- API documentation  
- And also an MCP server  

Normally, I would read the docs, search for endpoints, check parameters, and test.

This time, I connected the MCP server and asked questions like:

- How to create a payment?
- What data is required?
- What response will I get?

And it answered using the actual documentation.

It felt different.

Instead of reading documentation, I was interacting with it.

## What I Learned

- Documentation can become interactive
- AI can understand systems better with structure
- This can save time during integration

## My Thoughts

I think MCP is still early. Not many systems support it yet.

But it reminds me a bit of when new tech standards quietly changed how we build things. I’m curious to see where MCP goes next.

Learning it now might be helpful in the future.

✍️ Just a small note while learning something new.

---

