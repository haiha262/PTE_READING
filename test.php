<html>
<body>
<?php
$a = "hello";
?>
<script>
    $total_line = 1
    function echoHello($file_source)
    {
        <?php
        $file = fopen("./data/RW".$file_source, "r") or exit("Unable to open file!");
        //Output a line of the file until the end is reached
        $total_line = 0;
        $line_arr = array();
        while(!feof($file)) {
            $line = fgets($file);
            if($line != null)
                $line_arr[$total_line++] = $line;
        }
        fclose($file);
        ?>
    }
</script>
<?php

function hello() {
    global $a;
    $file_source++ ;
}
?>
<button onclick="echoHello()">Next</button>
</body>
</html>