# Copyright (c) 2022 Ewsgit
# Licensed under the MIT license

# The compilation script for the freecade project

import os
import time
from watchdog.observers import Observer
import watchdog.events


def compile():
    for file in os.listdir("src"):
        os.system("cp src/" + file + " out -r")
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
                f.close()
                if rout.find("<FC::") != -1:
                    rout += "<div style=\"width: 100vw; height: 100vh; position: fixed; font-family: monospace; display: flex; justify-content: center; align-items: center; z-index: 99999; text-align: center; top:0; left:0; color: #fff; background: #82f;\"><h1>Undefined component(s) were inserted into html code at compile time.</h1></div>"
                rout = rout.replace("\n", "")
                rout = rout.replace("  ", "")
                with open("out/" + file, "wt") as f:
                    f.write(rout)
                    f.close()


compile()


class Handler(watchdog.events.PatternMatchingEventHandler):
    def __init__(self):
        # Set the patterns for PatternMatchingEventHandler
        watchdog.events.PatternMatchingEventHandler.__init__(self, patterns=['*'],
                                                             ignore_directories=True, case_sensitive=False)

    def on_created(self, event):
        return

    def on_modified(self, event):
        compile()


# Initialize Observer
observer = Observer()
event_handler = Handler()
observer.schedule(event_handler, "./src/", recursive=True)
observer.schedule(event_handler, "./components/", recursive=True)
observer.start()
try:
    while True:
        time.sleep(5)
except:
    observer.stop()
    print("Observer Stopped")
