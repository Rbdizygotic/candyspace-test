<template>
  <!-- Main container for the grid layout -->
  <div
    class="relative grid xs-grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 items-center justify-center"
  >
    <!-- MotionGroup for animations with slide effect -->
    <MotionGroup preset="slideVisibleLeft" :duration="600">
      <!-- Loop through each car in the usedCars array -->
      <div
        v-for="car in usedCars"
        :key="car.id"
        class="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md hover:scale-105"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :hovered="{ scale: 1.05 }"
        :delay="50"
        :duration="300"
      >
        <!-- Container for the car image and year badge -->
        <div class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
          <!-- Button to open image modal -->
          <button
            @click="
              isImageModalOpen = true;
              selectedCar = car;
            "
          >
            <img
              class="object-cover"
              :src="car.media.photo_links[0]"
              :alt="car.heading"
            />
          </button>
          <!-- Year badge -->
          <span
            class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"
            >{{ car.build.year }}</span
          >
        </div>
        <!-- Container for car details -->
        <div class="mt-4 px-5 pb-5">
          <!-- Car heading -->
          <div href="#">
            <h5
              class="tracking-tight text-slate-900 text-nowrap overflow-hidden text-ellipsis"
            >
              {{ car.heading }}
            </h5>
          </div>
          <!-- Price display -->
          <div class="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span class="text-3xl font-bold text-slate-900">
                {{ `$${car.price}` }}
              </span>
            </p>
          </div>
          <!-- Button to open detail modal -->
          <button
            label="Open"
            @click="
              isDetailModalOpen = true;
              selectedCar = car;
            "
            class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            View Details
          </button>
        </div>
      </div>
    </MotionGroup>

    <!-- Modal for car details -->
    <UModal v-model="isDetailModalOpen">
      <div class="p-4">
        <UIcard>
          <h2 class="mb-3">Details</h2>
          <UDivider />
          <div class="space-y-4 my-3">
            <p>Label: {{ selectedCar.heading }}</p>
            <p>Year: {{ selectedCar.build.year }}</p>
            <p>Make: {{ selectedCar.build.make }}</p>
            <p>Model: {{ selectedCar.build.model }}</p>
            <p>Type: {{ selectedCar.build.vehicle_type }}</p>
            <p>Drivetrain: {{ selectedCar.build.drivetrain }}</p>
            <p>Fuel: {{ selectedCar.build.fuel_type }}</p>
            <p>Engine: {{ selectedCar.build.engine }}</p>
          </div>
        </UIcard>
      </div>
    </UModal>

    <!-- Modal for car images -->
    <UModal v-model="isImageModalOpen" width="w-xl">
      <div class="p-4">
        <UCarousel
          v-slot="{ item }"
          :items="selectedCar.media.photo_links"
          :ui="{ item: 'basis-full' }"
          class="rounded-lg overflow-hidden"
          arrows
        >
          <img :src="item" class="w-full" draggable="false" />
        </UCarousel>
      </div>
    </UModal>
  </div>
</template>

<script setup>
import carlist from "@/constants/carlist";

// Set the page title
useHead({
  title: "Candyspace - Car",
});

// Reactive variables for modals and selected car
const isDetailModalOpen = ref(false);
const isImageModalOpen = ref(false);
const selectedCar = ref();

// Used cars list
const usedCars = shallowRef(carlist);
</script>
