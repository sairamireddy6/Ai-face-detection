"use client"

import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/facemesh"
import Webcam from "react-webcam";
import { useRef } from "react";
import { drawMesh } from "@/utilities";


export default function Home() {

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runFacemesh = async () => {
    let net = null

    try {
      net = await facemesh.load({
        inputResolution:{windth:640,height:480}, scale:0.8
      })
      
    } catch (error) {
      
    }

    
    setInterval(() => {
      if(net){
        detect(net)

      }
    }, 100);
  }

  const detect = async (net) => {
    if(
      webcamRef.current 
    ){

      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeight = webcamRef.current.video.videoHeight

      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.height = videoHeight

      canvasRef.current.width = videoWidth
      canvasRef.current.height = videoHeight

      const face = await net.estimateFaces(video)
      console.log(face);

      const ctx = canvasRef.current.getContext("2d")
      drawMesh(face, ctx)
      

    }
  }

  runFacemesh()

  return (
   <div>
    <Webcam ref={webcamRef}
     style={{
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left:0,
      right:0,
      textAlign: 'center',
      zIndex:9,
      width:640,
      height:480
     }}
    />
    <canvas ref={canvasRef} 
    style={{
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left:0,
      right:0,
      textAlign: 'center',
      zIndex:9,
      width:640,
      height:480
     }}
    />
   </div>
  );
}
