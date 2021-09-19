<template>
  <main>
    <section class="self-center flex flex-col flex-1 items-center justify-center">
      <h1 class="title text-center">Proceswandelingen</h1>
      <!-- <h2 class="subtitle text-center"></h2> -->
    </section>

    <section class="mt-8">
      <!-- <h3 class="text-primary-600 dark:text-primary-400 max-w-5xl mx-auto">Latest blog post</h3> -->
      <posts post-type="projects" :amount="10" />
    </section>
  </main>
</template>
