---
layout: default
title: Home
---

<section class="hero">
  <p class="eyebrow">Welcome</p>
  <!--
  <h1>Notes by Refat Mustaque</h1>
  <p>
    A curated space for my engineering ideas, practical lessons, and working notes.
  </p>
  -->
</section>

<section class="posts-controls" aria-label="Blog controls">
  <label class="control-group" for="post-search">
    <span>Search</span>
    <input id="post-search" type="search" placeholder="Search blog posts..." autocomplete="off">
  </label>

  <label class="control-group" for="post-year-filter">
    <span>Year</span>
    <select id="post-year-filter">
      <option value="all">All years</option>
      {% assign sorted_posts = site.posts | sort: "date" | reverse %}
      {% assign previous_year = "" %}
      {% for post in sorted_posts %}
        {% assign year = post.date | date: "%Y" %}
        {% unless year == previous_year %}
          <option value="{{ year }}">{{ year }}</option>
          {% assign previous_year = year %}
        {% endunless %}
      {% endfor %}
    </select>
  </label>

  <label class="control-group" for="post-month-filter">
    <span>Month</span>
    <select id="post-month-filter">
      <option value="all">All months</option>
      <option value="1">January</option>
      <option value="2">February</option>
      <option value="3">March</option>
      <option value="4">April</option>
      <option value="5">May</option>
      <option value="6">June</option>
      <option value="7">July</option>
      <option value="8">August</option>
      <option value="9">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
  </label>

  <label class="control-group" for="post-sort-order">
    <span>Sort</span>
    <select id="post-sort-order">
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  </label>
</section>

<section class="posts-grid" id="posts">
  {% for post in site.posts %}
    <article
      class="post-card"
      data-title="{{ post.title | escape }}"
      data-excerpt="{{ post.excerpt | strip_html | strip_newlines | escape }}"
      data-year="{{ post.date | date: '%Y' }}"
      data-month="{{ post.date | date: '%-m' }}"
      data-date="{{ post.date | date: '%s' }}"
    >
      {% if post.image %}
        <a class="post-card-media" href="{{ post.url | relative_url }}">
          <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        </a>
      {% endif %}
      <p class="post-date">{{ post.date | date: "%b %-d, %Y" }}</p>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
      <a class="read-more" href="{{ post.url | relative_url }}">Read article</a>
    </article>
  {% endfor %}
</section>

<p class="posts-empty-state" id="posts-empty-state" hidden>No posts match your filters.</p>
