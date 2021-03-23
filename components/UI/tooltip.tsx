<div class="flex min-h-screen items-center justify-center">
  <div x-data="{ tooltip: false }" class="relative z-30 inline-flex">
    <div x-on:mouseover="tooltip = true" x-on:mouseleave="tooltip = false" class="rounded-md px-3 py-2 bg-indigo-500 text-white cursor-pointer shadow">
      Hover over me
    </div>
    <div class="relative" x-cloak x-show.transition.origin.top="tooltip">
      <div class="absolute top-0 z-10 w-32 p-2 -mt-1 text-sm leading-tight text-white transform -translate-x-1/2 -translate-y-full bg-blue-500 rounded-lg shadow-lg">
        Hi, I am Tooltip
      </div>
      <svg class="absolute z-10 w-6 h-6 text-blue-500 transform -translate-x-12 -translate-y-3 fill-current stroke-current" width="8" height="8">
        <rect x="12" y="-10" width="8" height="8" transform="rotate(45)" />
      </svg>
    </div>
  </div>

  <div class="flex items-end justify-end absolute bottom-0 right-0 mb-4 mr-4">
    <div>
      <a title="Buy me a coffee" href="https://www.buymeacoffee.com/rHcLDkY" target="_blank" class="block w-16 h-16">
        <img alt="Buy me a coffee" class="object-cover object-center w-full h-full rounded-full shadow-md hover:shadow-lg" src="https://cdn.dribbble.com/users/3349322/screenshots/14039201/media/616e4ae6995fb288e434c3f0927541ce.png" />
      </a>
    </div>
  </div>
</div>