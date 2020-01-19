from __future__ import print_function
import numpy as np
import time
import cv2
import os
from picamera.array import PiRGBArray
from picamera import PiCamera
import json

# load the COCO class labels our YOLO model was trained on
labelsPath = os.path.abspath("yolo-coco/coco.names")
LABELS = open(labelsPath).read().strip().split("\n")

# initialize a list of colors to represent each possible class label
np.random.seed(42)
COLORS = np.random.randint(0, 255, size=(len(LABELS), 3),
	dtype="uint8")

# derive the paths to the YOLO weights and model configuration
weightsPath = os.path.realpath('yolo-coco/yolov2.weights')
configPath = os.path.realpath("yolo-coco/yolov2.cfg")
 
# load our YOLO object detector trained on COCO dataset (80 classes)
print("[INFO] loading YOLO from disk...")
net = cv2.dnn.readNetFromDarknet(configPath, weightsPath)

camera = PiCamera()
camera.resolution = (1280, 720)
camera.framerate = 16
rawCapture = PiRGBArray( camera, size=(1280, 720))

time.sleep(0.1)

for frame in camera.capture_continuous(rawCapture, format="bgr", use_video_port=False):
  
  img = frame.array

  (H, W) = img.shape[:2]


  ln = net.getLayerNames()
  ln = [ln[i[0] - 1] for i in net.getUnconnectedOutLayers()]

  blob = cv2.dnn.blobFromImage(img, 1 / 255.0, (416, 416),
	swapRB=True, crop=False)
  net.setInput(blob)
  layerOutputs = net.forward(ln)

  boxes = []
  confidences = []
  classIDs = []

  for output in layerOutputs:
	# loop over each of the detections
    for detection in output:
      # extract the class ID and confidence (i.e., probability) of
      # the current object detection
      scores = detection[5:]
      classID = np.argmax(scores)
      confidence = scores[classID]
  
      # filter out weak predictions by ensuring the detected
      # probability is greater than the minimum probability
      if confidence > 0:
        # scale the bounding box coordinates back relative to the
        # size of the image, keeping in mind that YOLO actually
        # returns the center (x, y)-coordinates of the bounding
        # box followed by the boxes' width and height
        box = detection[0:4] * np.array([W, H, W, H])
        (centerX, centerY, width, height) = box.astype("int")
  
        # use the center (x, y)-coordinates to derive the top and
        # and left corner of the bounding box
        x = int(centerX - (width / 2))
        y = int(centerY - (height / 2))
  
        # update our list of bounding box coordinates, confidences,
        # and class IDs
        boxes.append([x, y, int(width), int(height)])
        confidences.append(float(confidence))
        classIDs.append(classID)

  idxs = cv2.dnn.NMSBoxes(boxes, confidences, 0, 50)
  people_count = 0
  if len(idxs) > 0:
	# loop over the indexes we are keeping
    for i in idxs.flatten():
      # extract the bounding box coordinates
      (x, y) = (boxes[i][0], boxes[i][1])
      (w, h) = (boxes[i][2], boxes[i][3])
  
      # draw a bounding box rectangle and label on the image
      color = [int(c) for c in COLORS[classIDs[i]]]
      cv2.rectangle(img, (x, y), (x + w, y + h), color, 2)
      text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
      if LABELS[classIDs[i]] == "person":
        people_count += 1

      cv2.putText(img, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
  
# show the output image
  cv2.imwrite("/home/pi/NoHiding/front-end/src/img/aiImage.jpg", img)
  with open('/home/pi/NoHiding/front-end/src/img/aiData.json', 'w') as json_file:
      json.dump(people_count, json_file)
  print(people_count)

  rawCapture.truncate(0)
  ch = cv2.waitKey(1)
  if ch == 27:
      break

