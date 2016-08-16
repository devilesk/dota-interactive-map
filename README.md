#interactive-dota-map

http://devilesk.com/dota2/apps/interactivemap2/

##Coordinate Data Conversion

The following getImageCoordinates function (written in Python) can be used to convert X/Y coordinates from the in-game coordinate system to the coordinate system the interactive map is using.

```
def reverse_lerp(minVal, maxVal, pos):
    return (pos - minVal) / (maxVal - minVal)

def getImageCoordinates(x_r,y_r):
    map_w = 5120
    map_h = 4766
    map_x_boundaries = (-8200, 8200)
    map_y_boundaries = (7558, -7678)
    x = int(reverse_lerp(map_x_boundaries[0], map_x_boundaries[1], x_r) * map_w)
    y = int(reverse_lerp(map_y_boundaries[0], map_y_boundaries[1], y_r) * map_h)
    return x, y
```

##Basic Example

Refer to basic.html and interactivemap.basic.js for a stripped down version which just has layers and markers representing the data, without all the other controls.