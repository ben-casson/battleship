sass --watch src/styles.scss src/output.min.css --style compressed



Page is loaded
first screen displayed
friendlyGameboard is created immediately
(/views) text telling user to place first ship
(/views) player can hover over grid to see where Carrier(5) ship will be placed
- on hover, loop looks at array in views already created that contains lengths of ships in order of placement
- handles hover color(s) showing whether or not it is valid placement (use separate function whose only role is to check placement validity, this function can also be used with on tile click)
- on tile click (if valid placement) 