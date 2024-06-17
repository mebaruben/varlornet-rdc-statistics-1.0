<template  >
      <div class="col-12 lg:col-6 xl:col-3 md:col-2">
            <div class="card mb-0">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-small mb-3">{{ cardData.title }}</span>
                        <div class="text-900 font-small text-md">{{ cardData.nombre }}</div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i :class="cardData.icon" class="text-blue-500 text-md"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium"></span>
                <span class="text-500"></span>
            </div>
        </div>
</template>
<script >

export default{
    props:{
        cardData:{
            type:Object , require:true
        }
    }
}

</script>