<hr>
<h3 class="mt-4 pb-2">{{page.title}}</h3>
<nav aria-label="breadcrumb post-bg-color">
    <ol class="breadcrumb post-bg-color">
        <li class="post-breadcrumb-item breadcrumb-item">
            <a href="#">
                <span class="post-author">{{page.author}}</span>
            </a>
        </li>
        {% assign date_format = site.minima.date_format | default: "%Y/%m/%d" %}
        <li class="post-breadcrumb-item breadcrumb-item"><span class="post-date">{{ page.date | date: date_format }}</span></li>
        <li class="post-breadcrumb-item breadcrumb-item post-tags">
            <i class="fas fa-tags"></i>&nbsp;Tags:&nbsp;
            {% for tag in page.tags %}
                <a href="#" class="rounded-0 badge badge-dark bgc-cpp">{{tag}}</a>
            {% endfor %}
        </li>
    </ol>
</nav>
<hr>
