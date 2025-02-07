<template>
    <div class="min-h-screen min-w-screen bg-white flex justify-center items-start pt-64">
        <img src="../assets/images/medtechlogo.png" alt="Medtech Logo" class="absolute left-[48px] top-4 w-36 h-auto"/>
        <div class="flex flex-col items-center gap-3 w-[350px]">
            <p class="text-2xl font-bold text-medcolor-blue mb-8">Login page</p>
            <div class="w-full relative flex items-center">
                <Input type="text" v-model="username" placeholder="Name" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light pl-12" />
                <icon name="material-symbols:account-box-outline" class="size-6 text-gray-400 absolute left-2" />
            </div>
            <div class="w-full relative flex items-center">
                <Input type="text" v-model="email" placeholder="Email" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light pl-12" />
                <icon name="material-symbols:mail-outline" class="size-6 text-gray-400 absolute left-2" />
            </div>
            <div class="w-full relative flex items-center">
                <Input type="password" placeholder="Password" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light pl-12" />
                <icon name="hugeicons:lock-password" class="size-6 text-gray-400 absolute left-2" />
            </div>
            <Button @click="saveAndLogin" class="bg-medcolor-blue hover:bg-medcolor-green w-full mt-2">Login</Button>
            <p class="mt-4 text-red-500 text-sm">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
const username = ref('')
const email = ref('')
const router = useRouter();
const errorMessage = ref(null)

// Function to store values in localStorage
const saveToLocalStorage = (key, value) => {
    if (process.client) {
        localStorage.setItem(key, value);
    }
};


// Login function
function saveAndLogin () {
    if ( username.value == '' || email.value ==  '' ) {
        errorMessage.value = "Please fill all fields to continue"
    } else {
        saveToLocalStorage('username', username.value);
        saveToLocalStorage('email', email.value);
        router.push({ path: "/membersManagement" });
    }
}

</script>