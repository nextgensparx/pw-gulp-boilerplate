<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv='content-type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title data-pw-id='title'>Title</title>

        <?=getResources("css",array(
            "lightbox",
            "font-awesome",
            "main"
        ))?>

        <region data-pw-id='head'></region>
    </head>

    <body>
        <main data-pw-id='main'></main>
        <footer data-pw-id='footer'></footer>
        <?php
        // Put any variables you want to pass to Javascript in this object
        $jsConfig = array();
        ?>
        <script type='text/javascript'>
            var pwConfig = <?=json_encode($jsConfig)?>;
        </script>
        <region data-pw-id='scripts'>
            <?=getResources("js", array(
                "manifest",
                "commons",
                "main",
            ))?>
        </region>
    </body>
</html>
