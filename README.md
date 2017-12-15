PlantUML Rapid Editor
=====================

## Pre-requisites
- Linux or something that can emulate its File System
- graphviz installed in the system (used by plantuml.war) (it will look for /usr/bin/dot)
- Java 1.7+
- node + npm (not required for the working bundle)

## How to use
execute the ```start.sh``` shell script, and go to [http://localhost:8080] it
might take a few seconds before ready, wait until the terminal stop showing traces

## How to change Listening Port
If the port 8080 is used in your system you can send the parameter ```-Djetty.port=[PORT_NUMBER]``` e.g.
```start.sh -Djetty.port=8085```

## How to deattach the visual area into a different window
Right click on the visual area, and a pop up window will be open, becareful the
browser might be blocking popups, you must allow them for this domain.

## Features
- Ctrl+` Shows/Hides the editor itself
- Ctrl+S Forces a save (won't work if there is a syntax error)
- enter using an anchor in the url will open that internal document e.g. ```http://localhost:8080/#default``` or ```http://localhost:8080/#myNewStoryDiagram```

## Missing Features
- Show to the user when there is a syntax error (just advice there is no feedback because of error)
- Save to a file in your computer
- Open from a file
- Syntax Hightlighter (https://github.com/raccy/language-plantuml/blob/master/grammars/plantuml.cson)