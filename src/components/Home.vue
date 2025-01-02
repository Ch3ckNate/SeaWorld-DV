<script lang="ts">
import { defineComponent, ref } from 'nativescript-vue';
import { requestPermissions, takePicture } from '@nativescript/camera';
import { ImageSource, Screen } from '@nativescript/core';

// Types for ML model response
interface DolphinIdentification {
  name: string;
  confidence: number;
  info: {
    age?: number;
    gender?: string;
    description?: string;
  };
}

export default defineComponent({
  name: 'Home',
  setup() {
    const capturedImage = ref<ImageSource | null>(null);
    const isProcessing = ref<boolean>(false);
    const identificationResult = ref<DolphinIdentification | null>(null);
    const errorMessage = ref<string | null>(null);
    const showWelcome = ref<boolean>(true);
    const screenHeight = ref<number>(Screen.mainScreen.heightDIPs);

    const startScanning = () => {
      showWelcome.value = false;
    };

    const scanDolphin = async () => {
      try {
        errorMessage.value = null;
        identificationResult.value = null;
        
        const granted = await requestPermissions();
        if (!granted) {
          errorMessage.value = 'Camera permission denied';
          return;
        }

        const imageAsset = await takePicture({
          width: 1024,
          height: 1024,
          keepAspectRatio: true,
          saveToGallery: false,
          cameraFacing: 'rear'
        });

        if (imageAsset) {
          capturedImage.value = await ImageSource.fromAsset(imageAsset);
          
          isProcessing.value = true;
          
          // ML Integration Point (preserved from previous version)
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          identificationResult.value = {
            name: "Test Dolphin",
            confidence: 0.95,
            info: {
              age: 5,
              gender: "Female",
              description: "Known for playful behavior"
            }
          };
          
          isProcessing.value = false;
        }
      } catch (error) {
        console.error('Error:', error);
        errorMessage.value = 'An error occurred while processing';
        isProcessing.value = false;
      }
    };

    const resetScan = () => {
      capturedImage.value = null;
      identificationResult.value = null;
      errorMessage.value = null;
    };

    return {
      capturedImage,
      isProcessing,
      identificationResult,
      errorMessage,
      showWelcome,
      screenHeight,
      startScanning,
      scanDolphin,
      resetScan
    };
  }
});
</script>

<template>
  <Frame>
    <Page actionBarHidden="true">
      <!-- Welcome Screen -->
      <GridLayout v-if="showWelcome" rows="*, auto" class="bg-blue-500">
        <!-- Welcome Content -->
        <StackLayout row="0" class="p-20">
          <Label 
            text="🐬" 
            class="text-center text-6xl m-b-20"
            style="font-size: 72"
          />
          <Label 
            text="Sea World" 
            class="text-white text-center font-bold m-b-10"
            style="font-size: 32"
          />
          <Label 
            text="Dolphin Scanner" 
            class="text-white text-center m-b-20"
            style="font-size: 24"
          />
          <Label 
            text="Discover and learn about our amazing dolphins using advanced AI technology" 
            class="text-white text-center" 
            textWrap="true"
            style="font-size: 16; line-height: 24"
          />
        </StackLayout>

        <!-- Welcome Footer -->
        <StackLayout row="1" class="p-x-20 p-b-30">
          <StackLayout class="bg-white p-15 rounded-lg m-b-20">
            <Label 
              text="How to use:" 
              class="font-bold m-b-10"
              style="font-size: 18"
            />
            <GridLayout rows="auto, auto, auto" columns="auto, *" class="m-l-10">
              <Label text="1." row="0" col="0" class="m-r-10"/>
              <Label text="Point your camera at a dolphin" row="0" col="1" textWrap="true"/>
              <Label text="2." row="1" col="0" class="m-r-10 m-t-5"/>
              <Label text="Take a clear photo" row="1" col="1" textWrap="true" class="m-t-5"/>
              <Label text="3." row="2" col="0" class="m-r-10 m-t-5"/>
              <Label text="Learn about your spotted friend!" row="2" col="1" textWrap="true" class="m-t-5"/>
            </GridLayout>
          </StackLayout>

          <Button 
            text="Start Scanning" 
            @tap="startScanning" 
            class="bg-white text-blue-500 font-bold p-15 rounded-full"
            style="font-size: 18"
          />
        </StackLayout>
      </GridLayout>

      <!-- Main App Screen -->
      <GridLayout v-else rows="auto, *, auto">
        <!-- Header -->
        <GridLayout row="0" columns="auto, *, auto" class="bg-blue-500 p-15">
          <Button 
            col="0"
            text="←" 
            @tap="showWelcome = true"
            class="text-white p-0 bg-transparent"
            style="font-size: 24; min-width: 40; min-height: 40"
          />
          <Label 
            col="1"
            text="Sea World Dolphin Scanner" 
            class="text-white font-bold text-center"
            style="font-size: 20"
          />
          <Label 
            col="2"
            text="🐬" 
            style="font-size: 24"
          />
        </GridLayout>

        <!-- Main Content -->
        <ScrollView row="1" class="bg-gray-100">
          <StackLayout class="p-15">
            <!-- Error Message -->
            <GridLayout v-if="errorMessage" columns="auto, *" class="bg-red-100 p-10 rounded-lg m-b-15">
              <Label text="⚠️" col="0" class="m-r-10"/>
              <Label :text="errorMessage" col="1" class="text-red-500" textWrap="true"/>
            </GridLayout>

            <!-- Guide Text -->
            <StackLayout v-if="!capturedImage && !isProcessing" class="bg-white p-15 rounded-lg m-b-15">
              <GridLayout rows="auto, auto" columns="auto, *">
                <Label 
                  text="🎯" 
                  row="0" 
                  col="0"
                  rowSpan="2"
                  class="m-r-15"
                  style="font-size: 48"
                />
                <Label 
                  text="Ready to Scan!" 
                  row="0"
                  col="1"
                  class="font-bold text-blue-500"
                  style="font-size: 24"
                />
                <Label
                  text="Position your camera in front of a dolphin and tap the button below"
                  row="1"
                  col="1"
                  class="text-gray-600"
                  textWrap="true"
                  style="font-size: 16; line-height: 22"
                />
              </GridLayout>

              <!-- Quick Tips -->
              <GridLayout rows="auto, auto, auto" columns="auto, *" class="m-t-20">
                <Label text="💡" row="0" col="0" class="m-r-10" style="font-size: 20"/>
                <Label text="Get a clear, well-lit shot" row="0" col="1" class="text-gray-700"/>
                
                <Label text="📏" row="1" col="0" class="m-r-10 m-t-5"/>
                <Label text="Stay 3-5 meters from the dolphin" row="1" col="1" class="text-gray-700 m-t-5"/>
                
                <Label text="🌊" row="2" col="0" class="m-r-10 m-t-5"/>
                <Label text="Avoid shooting through glass" row="2" col="1" class="text-gray-700 m-t-5"/>
              </GridLayout>
            </StackLayout>

            <!-- Captured Image -->
            <GridLayout v-if="capturedImage" class="m-b-15">
              <Image
                :src="capturedImage"
                stretch="aspectFit"
                :height="screenHeight * 0.35"
                class="rounded-lg"
              />
              <StackLayout v-if="isProcessing" 
                class="bg-black rounded-lg"
                style="opacity: 0.7"
                verticalAlignment="center"
              >
                <ActivityIndicator
                  :busy="true"
                  class="text-white"
                />
                <Label 
                  text="Analyzing..." 
                  class="text-white text-center m-t-10"
                  style="font-size: 16"
                />
              </StackLayout>
            </GridLayout>

            <!-- Results -->
            <StackLayout v-if="identificationResult" class="m-b-15">
              <!-- Result Header -->
              <GridLayout columns="*, auto" class="bg-white p-15 rounded-t-lg">
                <StackLayout col="0">
                  <Label
                    :text="identificationResult.name"
                    class="font-bold text-blue-500"
                    style="font-size: 24"
                  />
                  <Label
                    :text="'Confidence: ' + (identificationResult.confidence * 100).toFixed(1) + '%'"
                    class="text-green-500"
                    style="font-size: 16"
                  />
                </StackLayout>
                <Label 
                  col="1" 
                  text="🎯" 
                  style="font-size: 32"
                />
              </GridLayout>
              
              <!-- Result Details -->
              <StackLayout class="bg-white p-15 rounded-b-lg">
                <GridLayout v-if="identificationResult.info.age || identificationResult.info.gender"
                  columns="auto, *" rows="auto, auto" class="m-b-10">
                  <Label text="Age:" col="0" row="0" class="text-gray-500 m-r-10"/>
                  <Label :text="identificationResult.info.age" col="1" row="0"/>
                  <Label text="Gender:" col="0" row="1" class="text-gray-500 m-r-10 m-t-5"/>
                  <Label :text="identificationResult.info.gender" col="1" row="1" class="m-t-5"/>
                </GridLayout>
                
                <Label
                  v-if="identificationResult.info.description"
                  :text="identificationResult.info.description"
                  class="text-gray-700"
                  textWrap="true"
                  style="font-size: 16; line-height: 22"
                />
              </StackLayout>
            </StackLayout>
          </StackLayout>
        </ScrollView>

        <!-- Footer Actions -->
        <GridLayout row="2" columns="auto, *" class="bg-white p-15 shadow-lg">
          <Button
            v-if="capturedImage"
            col="0"
            text="New Scan"
            @tap="resetScan"
            class="bg-gray-200 text-gray-700 p-10 rounded-lg m-r-10"
            style="min-width: 100"
          />
          <Button
            :col="capturedImage ? 1 : '0:2'"
            text="Scan Dolphin"
            @tap="scanDolphin"
            :isEnabled="!isProcessing"
            class="bg-blue-500 text-white font-bold p-15 rounded-lg"
          />
        </GridLayout>
      </GridLayout>
    </Page>
  </Frame>
</template>
