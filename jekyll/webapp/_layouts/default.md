<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{{page.title}}</title>
        <!-- Bootstrap - JS -->
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
        <script src="./static/js/bootstrap.min.js" charset="utf-8"></script>
        <!--
        Hamburgers by Jonathan Suh
        @description Tasty CSS-animated hamburgers
        @author Jonathan Suh @jonsuh
        @site https://jonsuh.com/hamburgers
        @link https://github.com/jonsuh/hamburgers
        -->
        <link rel="stylesheet" href="./static/css/hamburgers.min.css">
        <!-- FontAwesome - icons -->
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
        <!-- Bootstrap - CSS -->
        <link rel="stylesheet" href="./static/css/main.css">
    </head>
    <body>
        <!-- Header (Extend) Main Container -> Row - start -->
        <div class="container-fluid">
            <div class="row">
                <!-- Toc - Mobile - Common -->
                <div class="col-12">
                    <nav class="navbar" id="header-navbar">
                        <a class="navbar-brand"></a>
                        <button id="toc" class="d-inline-block d-sm-none hamburger hamburger--collapse" type="button" data-toggle="collapse" data-target="#mobilemenu"  aria-expanded="true" aria-controls="collapseMobile">
                        <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                        </span>
                        </button>
                    </nav>
                </div>
                <!-- Toc collapse - Mobile - Common -->
                <div class="col-12 collapse show-on-mobile" id="mobilemenu">
                    {% include toc-collapse-content.md %}
                </div>
                <!-- CONTENT HERE -->
                {{content}}
                <!-- CONTENT HERE -->
            </div>
        </div>
        <!-- Header (Extend) Main Container - stop -->
    </body>
    <!-- Script, Header - mobile toc toggle -->
    <script type="text/javascript">
        $('#mobilemenu').on('show.bs.collapse', function () {
          $("#toc").toggleClass("is-active");
        });
        $('#mobilemenu').on('hide.bs.collapse', function () {
          $("#toc").toggleClass("is-active");
        });
    </script>
</html>
