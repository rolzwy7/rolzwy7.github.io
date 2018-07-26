---
layout: default
---
{% include home/home-left-panel.md %}
<!-- Breadcrumb - Homepage -->
<div class="col-12 show-on-mobile wrapper">
    {% include breadcrumb.md %}
</div>
<!-- Welcome -->
<div class="col-12 wrapper">
    <hr>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    <hr>
</div>
<!-- Writings listing -->
<div class="col-lg-6 col-md-12 writings appear50 wrapper">
    <h3 class="text-pumpkinspace">#Writings</h3>
    {% for post in site.posts limit:10 %}
    <p class="listing">
        <a href="{{ post.url | relative_url }}">
            {{ post.title | escape }}
        </a>
        {% assign date_format = site.minima.date_format | default: "%Y/%m/%d" %}
        <br><span>{{ post.date | date: date_format }}</span>
    </p>
    {% endfor %}
</div>
<!-- Projects listing -->
<div class="col-lg-6 col-md-12 projects appear50 wrapper">
    <h3 class="text-orchid">#Projects</h3>
    <p class="listing">
        <a href="#link">
            Lorem ipsum dolor sit amet,
        </a>
        <br><span>2018/03/19</span>
    </p>
</div>
<!-- Miscellaneous listing -->
<div class="col-lg-6 col-md-12 miscellaneous appear50 wrapper">
    <h3 class="text-boundedrationality">#Miscellaneous</h3>
    <p class="listing">
        <a href="#link">
            Lorem ipsum dolor sit amet,
        </a>
    </p>
</div>
