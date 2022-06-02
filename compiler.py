# Copyright (c) 2022 Ewsgit
# Licensed under the MIT license

# The compilation script for the freecade project

import os

import sys
import time
import logging
from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler


def compile():
    for file in os.listdir("src"):
        os.system("cp src/" + file + " out")
    for file in os.listdir("out"):
        if file.endswith(".html"):
            print("File: " + file)
            with open("out/" + file, "rt") as f:
                rout = f.read()
                for component in os.listdir("components"):
                    component = component.replace(".html", "")
                    rout = rout.replace("<" + component + " />",
                                        open("components/" + component + ".html", "rt").read())
                    rout = rout.replace("<" + component + "></" + component + ">",
                                        open("components/" + component + ".html", "rt").read())
                if rout.find("<FC::"):
                    rout += "<div style=\"width: auto; height: auto; position: fixed; font-family: monospace; display: flex; justify-content: center; align-items: center; z-index: 99999; top:0; left:0; margin:5rem;\"><h1>Undefined Component was inserted into html code</h1></div>"
                f.close()
                rout = rout.replace("\n", "")
                rout = rout.replace("  ", "")
                with open("out/" + file, "wt") as f:
                    f.write(rout)
                    f.close()


compile()


def handler():
    print("file changed")
    compile()


# Initialize Observer
observer = Observer()
event_handler = handler()
observer.schedule(event_handler, ".", recursive=True)
observer.start()
try:
    while True:
        time.sleep(5)
except:
    observer.stop()
    print("Observer Stopped")
