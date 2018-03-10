import folium
import pandas

#reading data from external txt file using pandas because it can make sense out of the structure
data = pandas.read_csv("Volcanoes.txt")

#storing the required columns in variables
lat = list(data["LAT"])
lon = list(data["LON"])
elev = list(data["ELEV"])

#function to call later for volcano active level
def color_producer(elevation):

    if elevation < 1000:
        return 'green'
    elif  1000 <= elevation < 3000:
        return 'orange'
    else:
        return 'red'

#coordinates 30.58, -99.09 are starting potions
map = folium.Map(location=[30.58, -99.09],
                zoom_start=6,
                tiles="Mapbox Bright")

#this value is stored to make code cleaner
fg = folium.FeatureGroup(name="My Map")

# 3 iterations using 3 lists
for lt, ln, el in zip(lat, lon, elev):
    fg.add_child(folium.CircleMarker(location=[lt, ln],
    radius = 6,
    popup=str(el)+" m",
    fill=True,
    fill_color= color_producer(el),
    color='grey',
    fill_opacity=0.7))

#loading json file to add a polygon layer
fg.add_child(folium.GeoJson(data=open('world.json', 'r', encoding='utf-8-sig'), style_function=lambda x: {'fillColor':'yellow'}))

#adding points on to the map
map.add_child(fg)

#saving the html file for viewing
map.save("map1.html")
