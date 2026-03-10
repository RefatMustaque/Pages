---
layout: default
title: Home
---

<section class="home-hero" aria-labelledby="home-title">
  <div class="home-hero-copy">
    <p class="eyebrow">Software Engineering Notes</p>
    <h1 id="home-title">Build logs, practical guides, and code-first insights.</h1>
    <p>
      A programming journal focused on implementation details, deployment workflows,
      and lessons from building real products.
    </p>
    <div class="home-hero-cta">
      <a class="button button-primary" href="#featured-posts">Explore featured</a>
      <a class="button button-ghost" href="#posts">Browse all posts</a>
    </div>
  </div>
  <div class="home-hero-art" aria-hidden="true">
    <svg class="hero-schematic" width="1200" height="600" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="hero-svg-title hero-svg-desc" focusable="false">
      <title id="hero-svg-title">Technical Programming Blog Hero</title>
      <desc id="hero-svg-desc">Minimal futuristic hero with flowing network lines, glowing nodes, and a floating code editor.</desc>

      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#0A1026"/>
          <stop offset="0.55" stop-color="#0F1635"/>
          <stop offset="1" stop-color="#17113A"/>
        </linearGradient>

        <radialGradient id="glowA" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(280 140) rotate(25) scale(320 220)">
          <stop offset="0" stop-color="#57D6FF" stop-opacity="0.22"/>
          <stop offset="1" stop-color="#57D6FF" stop-opacity="0"/>
        </radialGradient>

        <radialGradient id="glowB" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(980 470) rotate(-12) scale(360 240)">
          <stop offset="0" stop-color="#8E63FF" stop-opacity="0.22"/>
          <stop offset="1" stop-color="#8E63FF" stop-opacity="0"/>
        </radialGradient>

        <linearGradient id="lineGrad" x1="120" y1="0" x2="1080" y2="600" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#64E7FF"/>
          <stop offset="1" stop-color="#9D72FF"/>
        </linearGradient>

        <linearGradient id="editorStroke" x1="380" y1="120" x2="920" y2="500" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#5EDBFF"/>
          <stop offset="1" stop-color="#9367FF"/>
        </linearGradient>

        <filter id="softBlur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="18"/>
        </filter>

        <filter id="nodeGlow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <style>
        .flow {
          stroke-dasharray: 10 12;
          animation: drift 16s linear infinite;
        }
        .flow-slow {
          stroke-dasharray: 7 11;
          animation: drift 24s linear infinite reverse;
        }
        .node {
          animation: pulse 3.2s ease-in-out infinite;
          transform-origin: center;
          transform-box: fill-box;
        }
        .cursor {
          animation: blink 1s steps(1, end) infinite;
        }
        @keyframes drift {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -320; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.18); }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      </style>

      <rect width="1200" height="600" fill="url(#bg)"/>
      <rect width="1200" height="600" fill="url(#glowA)"/>
      <rect width="1200" height="600" fill="url(#glowB)"/>

      <g opacity="0.75">
        <path class="flow" d="M40 130C170 70 240 170 360 150C500 127 590 40 730 76C845 105 930 190 1160 140" stroke="url(#lineGrad)" stroke-width="2"/>
        <path class="flow-slow" d="M-20 430C120 350 230 470 380 438C540 405 640 294 770 310C900 326 1010 426 1220 390" stroke="url(#lineGrad)" stroke-width="2"/>
        <path class="flow" d="M130 560C270 500 350 530 470 508C610 482 710 402 840 420C950 435 1040 510 1180 490" stroke="url(#lineGrad)" stroke-width="1.8" opacity="0.75"/>
        <path class="flow-slow" d="M120 18C250 60 300 120 430 112C570 103 650 40 790 62C940 86 1040 178 1140 248" stroke="url(#lineGrad)" stroke-width="1.8" opacity="0.68"/>
      </g>

      <g filter="url(#nodeGlow)">
        <circle class="node" cx="226" cy="140" r="4" fill="#6DEBFF"/>
        <circle class="node" cx="358" cy="150" r="4" fill="#8C67FF"/>
        <circle class="node" cx="692" cy="74" r="4" fill="#6DEBFF"/>
        <circle class="node" cx="900" cy="180" r="4" fill="#8C67FF"/>
        <circle class="node" cx="762" cy="314" r="4" fill="#6DEBFF"/>
        <circle class="node" cx="416" cy="438" r="4" fill="#8C67FF"/>
        <circle class="node" cx="986" cy="432" r="4" fill="#6DEBFF"/>
        <circle class="node" cx="1110" cy="142" r="4" fill="#8C67FF"/>
      </g>

      <g transform="translate(345 118)">
        <rect x="12" y="18" width="500" height="350" rx="20" fill="#121A3B" opacity="0.5" filter="url(#softBlur)"/>
        <rect x="0.5" y="0.5" width="500" height="350" rx="20" fill="#0E1636" stroke="url(#editorStroke)"/>

        <rect x="1" y="1" width="498" height="44" rx="19" fill="#111C42"/>
        <circle cx="26" cy="23" r="5" fill="#63E6FF"/>
        <circle cx="46" cy="23" r="5" fill="#7D6CFF"/>
        <circle cx="66" cy="23" r="5" fill="#59D8F5"/>
        <rect x="96" y="14" width="152" height="18" rx="9" fill="#16244F"/>
        <text x="112" y="27" fill="#8CB4FF" font-size="11" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace">hero.tsx</text>

        <g font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="14">
          <text x="28" y="88" fill="#6DEBFF">&lt;/&gt;</text>
          <text x="88" y="88" fill="#B8C8FF">const</text>
          <text x="132" y="88" fill="#D6DEFF">theme</text>
          <text x="182" y="88" fill="#8FA7FF">=</text>
          <text x="198" y="88" fill="#7D6CFF">{</text>
          <text x="212" y="88" fill="#D6DEFF">minimal</text>
          <text x="270" y="88" fill="#8FA7FF">:</text>
          <text x="282" y="88" fill="#6DEBFF">true</text>
          <text x="315" y="88" fill="#7D6CFF">};</text>

          <rect x="88" y="108" width="320" height="8" rx="4" fill="#1A2A57"/>
          <rect x="88" y="132" width="280" height="8" rx="4" fill="#1A2A57"/>
          <rect x="88" y="156" width="338" height="8" rx="4" fill="#1A2A57"/>
          <rect x="88" y="180" width="246" height="8" rx="4" fill="#1A2A57"/>
          <rect x="88" y="204" width="300" height="8" rx="4" fill="#1A2A57"/>

          <text x="28" y="250" fill="#9EC7FF">$</text>
          <text x="44" y="250" fill="#BFD3FF">npm run build</text>
          <rect class="cursor" x="162" y="238" width="8" height="14" rx="2" fill="#6DEBFF"/>

          <text x="28" y="292" fill="#7D6CFF">{ }</text>
          <text x="74" y="292" fill="#D6DEFF">deploy</text>
          <text x="126" y="292" fill="#8FA7FF">:</text>
          <text x="138" y="292" fill="#6DEBFF">"ready"</text>
        </g>
      </g>

      <path d="M96 66H156" stroke="#5EDBFF" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <path d="M96 66V126" stroke="#5EDBFF" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <path d="M1104 534H1044" stroke="#9168FF" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
      <path d="M1104 534V474" stroke="#9168FF" stroke-width="2" stroke-linecap="round" opacity="0.5"/>
    </svg>
  </div>
</section>

<section id="featured-posts" class="featured-posts" aria-labelledby="featured-title">
  <div class="section-head">
    <p class="eyebrow">Featured</p>
    <h2 id="featured-title">Featured posts</h2>
  </div>

  {% assign featured_posts = site.posts | slice: 0, 3 %}
  <div class="featured-grid">
    {% for post in featured_posts %}
      {% assign words = post.content | strip_html | number_of_words %}
      {% assign read_minutes = words | divided_by: 220 %}
      {% if read_minutes < 1 %}
        {% assign read_minutes = 1 %}
      {% endif %}
      <article class="featured-card {% if forloop.first %}featured-card-lead{% endif %}">
        <a class="featured-card-link" href="{{ post.url | relative_url }}">
          {% if post.image %}
            <div class="featured-media">
              <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
            </div>
          {% else %}
            <div class="featured-media featured-media-fallback" aria-hidden="true">{ }</div>
          {% endif %}
          <span class="featured-badge">{{ post.date | date: "%Y" }}</span>
          <h3>{{ post.title }}</h3>
          <p>{{ post.excerpt | strip_html | truncate: 145 }}</p>
          <div class="featured-meta">
            <span>{{ post.date | date: "%b %-d" }}</span>
            <span>{{ read_minutes }} min</span>
          </div>
        </a>
      </article>
    {% endfor %}
  </div>
</section>

<section class="category-discovery" aria-labelledby="category-title">
  <div class="section-head">
    <p class="eyebrow">Discover</p>
    <h2 id="category-title">Browse by topic</h2>
  </div>
  <div class="category-chips" id="category-chips" role="group" aria-label="Filter posts by topic">
    <button type="button" class="category-chip is-active" data-filter="all">All</button>
    <button type="button" class="category-chip" data-filter="deployment">Deployment</button>
    <button type="button" class="category-chip" data-filter="github">GitHub</button>
    <button type="button" class="category-chip" data-filter="api">API</button>
    <button type="button" class="category-chip" data-filter="dotnet">.NET</button>
    <button type="button" class="category-chip" data-filter="security">Security</button>
  </div>
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
    {% assign words = post.content | strip_html | number_of_words %}
    {% assign read_minutes = words | divided_by: 220 %}
    {% if read_minutes < 1 %}
      {% assign read_minutes = 1 %}
    {% endif %}
    {% assign taxonomy_text = post.title | append: ' ' | append: post.excerpt | downcase %}
    <article
      class="post-card"
      data-title="{{ post.title | escape }}"
      data-excerpt="{{ post.excerpt | strip_html | strip_newlines | escape }}"
      data-year="{{ post.date | date: '%Y' }}"
      data-month="{{ post.date | date: '%-m' }}"
      data-date="{{ post.date | date: '%s' }}"
      data-taxonomy="{{ taxonomy_text | strip_html | strip_newlines | escape }}"
    >
      {% if post.image %}
        <a class="post-card-media" href="{{ post.url | relative_url }}">
          <img src="{{ post.image | relative_url }}" alt="{{ post.title }}">
        </a>
      {% endif %}
      <div class="post-card-meta">
        <p class="post-date">{{ post.date | date: "%b %-d, %Y" }}</p>
        <p class="post-read-time">{{ read_minutes }} min read</p>
      </div>
      <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
      <p>{{ post.excerpt | strip_html | truncate: 150 }}</p>
      <div class="post-tags" aria-label="Post tags">
        {% assign title_down = post.title | downcase %}
        {% if title_down contains 'github' %}<span class="tag">GitHub</span>{% endif %}
        {% if title_down contains 'deploy' or title_down contains 'action' %}<span class="tag">Deployment</span>{% endif %}
        {% if title_down contains 'gateway' or title_down contains 'payment' %}<span class="tag">Security</span>{% endif %}
        {% if title_down contains '.net' %}<span class="tag">.NET</span>{% endif %}
      </div>
      <a class="read-more" href="{{ post.url | relative_url }}">Read article</a>
    </article>
  {% endfor %}
</section>

<p class="posts-empty-state" id="posts-empty-state" hidden>No posts match your filters.</p>
