# Copyright (c) 2022 Ewsgit
# Licensed under the MIT license

# The compilation script for the freecade project

import os

# copy the files in the folder src to the folder out
def copy_files():
  for file in os.listdir("src"):
    os.system("cp src/" + file + " " + "out")

# loop through the files in the folder out
# and print the file name and content
def print_files():
  for file in os.listdir("out"):
    if file.endswith(".html"):
      print("File: " + file)
      with open("out/" + file, "r") as f:
        print(f.read())

copy_files()
print_files()