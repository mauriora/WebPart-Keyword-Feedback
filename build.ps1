Clear-Host;

gulp clean;
if ($?) {
    gulp build --ship;
    if ($?) {
        gulp bundle --ship; 
        if ($?) {
            gulp package-solution --ship 
        } 
    } 
}