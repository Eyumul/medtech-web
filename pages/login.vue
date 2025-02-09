<template>
    <div class="min-h-screen min-w-screen bg-white flex flex-col items-center pt-64">
        <img src="../assets/images/medtechlogo.png" alt="Medtech Logo" class="absolute cursor-pointer left-[48px] top-4 w-36 h-auto"/>
        <form @submit.prevent="() => (isSignUp ? signUp() : login())" class="flex flex-col items-center gap-3 w-[350px]">
            <div class="text-2xl font-bold text-medcolor-blue mb-8">
                <span v-if="isSignUp">Sign Up form</span>
                <span v-else>Login form</span>
            </div>
            <div v-if="isSignUp" class="w-full relative flex items-center">
                <Input type="text" v-model="fullname" placeholder="Full Name" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light pl-12" />
                <icon name="material-symbols:account-box-outline" class="size-6 text-gray-400 absolute left-2" />
            </div>
            <div class="w-full relative flex items-center">
                <Input type="text" v-model="email" placeholder="Email" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light pl-12" />
                <icon name="material-symbols:mail-outline" class="size-6 text-gray-400 absolute left-2" />
            </div>
            <div class="w-full relative flex items-center">
                <Input type="password" v-model="password" placeholder="Password" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light pl-12" />
                <icon name="hugeicons:lock-password" class="size-6 text-gray-400 absolute left-2" />
            </div>
            <Button type="submit" class="bg-medcolor-blue hover:bg-medcolor-green w-full mt-2">
                <span v-if="!isLoading">{{ isSignUp ? 'Sign up' : 'Login' }}</span>
                <span v-else class="flex items-center gap-2">
                    <icon name="line-md:loading-twotone-loop" class="size-4"/>
                    <p>Loading...</p>
                </span>
            </Button>
        </form>
        <div @click="isSignUp = !isSignUp; errorMessage = null; fullname = ''; email = ''; password = ''" class="w-[350px] mt-8 text-sm text-center underline text-medcolor-blue cursor-pointer">
            <span v-if="isSignUp">Have an account? Log in instead</span>
            <span v-else>Create a new account</span>
        </div>
        <p v-if="errorMessage" class="mt-4 text-red-500 text-sm">{{ errorMessage }}</p>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: ['auth']
})
const fullname = ref('')
const email = ref('')
const password = ref('')
const isSignUp = ref(false)
const isLoading = ref(false) // Loading indicator
const client = useSupabaseClient()

const errorMessage = ref(null)

const signUp = async () => {
    if (fullname.value != ''){
        errorMessage.value = null // Reset error message
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: { name: fullname.value } // Store name in user_metadata
            }
        })
        
        if (error) {
            console.error('Sign-up Error:', error.message)
            errorMessage.value = error.message
        } else {
            console.log('Signed up successfully:', data.user.user_metadata.name) // Correct way to access the name
            isSignUp.value = false
        }
    } else {
        errorMessage.value = 'Please Enter your full name'
    }
}

const login = async () => {
    errorMessage.value = null // Reset error message
    isLoading.value = true; // Start loading
    const { data, error } = await client.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    })

    if (error) {
        console.error('Login Error:', error.message)
        errorMessage.value = error.message
        isLoading.value = false; // Stop loading on error
    } else {
        console.log('Logged in successfully:', data.user.user_metadata.name) // Retrieve name
    }
}

const user = useSupabaseUser()
onMounted(() => {
    watchEffect(() => {
        if(user.value) {
            navigateTo('/')
        }
    })
})

</script>