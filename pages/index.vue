<template>
    <div class="w-full flex flex-col gap-12 pb-12">
        <!-- navbar -->
        <div class="flex shadow-md sticky top-0 justify-between pt-4 pb-4 px-[48px] bg-white">
            <img src="../assets/images/medtechlogo.png" alt="Medtech Logo" class="w-36 h-auto"/>
            <div class="flex items-center gap-4 mr-8">
                <Button variant="outline" class="border-medcolor-blue text-medcolor-blue hover:border-medcolor-green hover:text-medcolor-green hover:bg-transparent">
                    Logout
                </Button>
                <div class="flex gap-4 ml-16">
                    <img src="../assets/images/hrProfilePic.jpg" alt="HR Profile Picture" class="w-12 h-12 rounded-full object-cover"/>
                    <div>
                        <p class="text-medcolor-green font-bold">Abebe Kebede</p>
                        <p class="text-sm text-medcolor-blue font-medium">abeKebe@example.com</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- intro section -->
        <div class="flex items px-[48px] gap-24">
            <img src="../assets/images/dashboardImage.jpg" alt="Dashboard Image" class="w-[800px] object-cover h-[400px] rounded-lg"/>
            <div class="flex flex-col gap-16">
                <p class="text-6xl text-medcolor-blue font-bold">Welcome, <span class="text-medcolor-green">Abebe Kebede</span>👋</p>
                <p class="text-xl text-medcolor-blue font-medium">We’re glad to have you on board. Here’s what you can do on your dashboard:</p>
                <ul class="flex flex-col list-disc list-inside bg-[#e7f6e2] p-5 rounded-xl gap-4 text-base text-medcolor-blue font-medium">
                    <li>🔎 <span class="font-extrabold">Search Members:</span> Quickly find employees using the search bar.</li>
                    <li>➕ <span class="font-extrabold">Add New Member:</span> Click the "Add Member" button to register a new employee.</li>
                    <li>📋 <span class="font-extrabold">View Member Data:</span> Browse through the table to see employee details.</li>
                    <li>🛠 <span class="font-extrabold">Manage Profiles:</span> Update or remove employee records as needed using action column.</li>
                </ul>
            </div>
        </div>
        <!-- header section -->
         <div class="flex justify-between px-[48px]">
            <p class="text-4xl font-black text-medcolor-blue">Members Managment</p>
            <div class="flex relative gap-1.5 items-center w-full max-w-lg h-12">
                <Input type="text" placeholder="Search member" class="pl-12 h-full" />
                <icon name="uil:search" class="absolute left-2 size-6 text-gray-300 ring-2 ring-red-500"/>
                <Button type="submit" class="bg-medcolor-blue hover:bg-medcolor-green h-full px-12">Search</Button>
            </div>
         </div>
        <!-- table section -->
        <div class="px-[48px]">
            <Table class="border-[1px]">
                <TableCaption>A list of registered members.</TableCaption>
                <TableHeader class="bg-white">
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Surety</TableHead>
                        <TableHead class="text-center">Surety's Document</TableHead>
                        <TableHead class="text-center">Educational Document</TableHead>
                        <TableHead>Code N<u>o</u></TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody class="font-medium text-base">
                    <TableRow v-for="member of paginatedMembers" :key="member.id">
                        <TableCell>{{ member._id }}</TableCell>
                        <TableCell class="text-medcolor-green font-bold">{{ member.name }}</TableCell>
                        <TableCell>{{ member.email }}</TableCell>
                        <TableCell>{{ member.age }}</TableCell>
                        <TableCell>{{ member.salary }}</TableCell>
                        <TableCell>{{ member.position }}</TableCell>
                        <TableCell>{{ member.surety }}</TableCell>
                        <TableCell class="text-center">
                            <a v-if="member.suretyDocument" :href="member.suretyDocument" target="_blank">
                                <icon name="uil:file-alt" class="text-xl"/>
                            </a>
                        </TableCell>
                        <TableCell class="text-center">
                            <a v-if="member.educationalDocument" :href="member.educationalDocument" target="_blank">
                                <icon name="uil:file-alt" class="text-xl"/>
                            </a>
                        </TableCell>

                        <TableCell>{{ member.codeNumber }}</TableCell>
                        <TableCell>{{ member.status }}</TableCell>
                        <TableCell class="flex justify-center">
                            <DropdownMenu class="relative">
                                <DropdownMenuTrigger>
                                    <icon name="tabler:dots-vertical"/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent class="absolute -right-5">
                                    <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator /> -->
                                    <Dialog>
                                        <DialogTrigger as-child>
                                            <DropdownMenuItem class="text-medcolor-blue" @select.prevent>
                                                <icon name="uil:edit" />
                                                <span class="ml-2">Edit</span>
                                            </DropdownMenuItem>
                                        </DialogTrigger>
                                        <DialogContent class="sm:max-w-[800px]">
                                            <DialogHeader>
                                                <DialogTitle class="text-3xl text-medcolor-blue font-bold">Edit member</DialogTitle>
                                                <DialogDescription>
                                                    Make sure edit what you want before you submit
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div class="grid grid-cols-2 gap-4 py-4">
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="name" class="text-right text-medcolor-green font-bold">
                                                        Name
                                                    </Label>
                                                    <Input type="text" v-model="member.name" placeholder="alex simpson" id="name" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="email" class="text-right text-medcolor-green font-bold">
                                                        Email
                                                    </Label>
                                                    <Input type="text" v-model="member.email" placeholder="alex@example.com" id="email"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="age" class="text-right text-medcolor-green font-bold">
                                                        Age
                                                    </Label>
                                                    <Input type="number" v-model="member.age" placeholder="30" id="age"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="salary" class="text-right text-medcolor-green font-bold">
                                                        Salary
                                                    </Label>
                                                    <Input type="number" v-model="member.salary" placeholder="200000" id="salary"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="position" class="text-right text-medcolor-green font-bold">
                                                        Position
                                                    </Label>
                                                    <Input type="text" v-model="member.position" placeholder="accountant" id="position"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="surety" class="text-right text-medcolor-green font-bold">
                                                        Surety
                                                    </Label>
                                                    <Input type="text" v-model="member.surety" placeholder="Jhon" id="surety"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="suretyDocument" class="text-right text-medcolor-green font-bold">
                                                        Surety Document
                                                    </Label>
                                                    <Input type="file" @change="handleFileUpload($event, 'suretyDocument', member)"  id="suretyDocument" accept=".pdf" required  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="educationalDocument" class="text-right text-medcolor-green font-bold">
                                                        Educational Document
                                                    </Label>
                                                    <Input type="file" @change="handleFileUpload($event, 'educationalDocument', member)" id="educationalDocument" accept=".pdf" required  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <p class="text-right text-medcolor-green font-bold text-sm">
                                                        Current Surety Document
                                                    </p>
                                                    <a v-if="member.suretyDocument" :href="member.suretyDocument" target="_blank">
                                                        <icon name="uil:file-alt" class="text-xl"/>
                                                    </a>
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <p class="text-right text-medcolor-green font-bold text-sm">
                                                        Current Educational Document
                                                    </p>
                                                    <a v-if="member.educationalDocument" :href="member.educationalDocument" target="_blank">
                                                        <icon name="uil:file-alt" class="text-xl"/>
                                                    </a>
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="codeNumber" class="text-right text-medcolor-green font-bold">
                                                        Code Number
                                                    </Label>
                                                    <Input type="text" v-model="member.codeNumber" placeholder="we238alex" id="codeNumber"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                                                </div>
                                                <div class="grid grid-cols-4 items-center gap-4">
                                                    <Label for="status" class="text-right text-medcolor-green font-bold">
                                                        Status
                                                    </Label>
                                                    <Select v-model="member.status" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3">
                                                        <SelectTrigger class="w-[180px]">
                                                        <SelectValue placeholder="Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>--- Status ---</SelectLabel>
                                                            <SelectItem value="Individual">
                                                            Individual
                                                            </SelectItem>
                                                            <SelectItem value="Branch">
                                                            Branch
                                                            </SelectItem>
                                                        </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose as-child>
                                                    <Button type="button" variant="outline" class="border-medcolor-blue px-12 text-medcolor-blue hover:border-medcolor-green hover:text-medcolor-green hover:bg-transparent">
                                                        Cancel
                                                    </Button>
                                                </DialogClose>
                                                <Button @click="handleUpdate(member)" type="submit" class="bg-medcolor-blue px-12 hover:bg-medcolor-green">
                                                    Save
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <DropdownMenuItem @click="handleDelete(member._id)" class="text-red-500">
                                        <icon name="uil:trash-alt" />
                                        <span class="ml-2">Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <!-- pagination -->
        <div class="px-[48px] w-full flex justify-center">
            <Pagination v-slot="{ page }" v-model:page="currentPage" :total="members.length" :items-per-page="pageSize" :sibling-count="1" show-edges>
                <PaginationList v-slot="{ items }" class="flex items-center gap-1">
                    <PaginationFirst />
                    <PaginationPrev />
    
                    <template v-for="(item, index) in items">
                        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                            <Button class="w-10 h-10 p-0" :class="item.value === page ? 'bg-medcolor-blue hover:bg-medcolor-blue' : 'text-medcolor-blue hover:border-medcolor-blue hover:text-medcolor-blue'" :variant="item.value === page ? 'default' : 'outline'">
                                {{ item.value }}
                            </Button>
                        </PaginationListItem>
                        <PaginationEllipsis v-else :key="item.type" :index="index" />
                    </template>
    
                    <PaginationNext />
                    <PaginationLast />
                </PaginationList>
            </Pagination>
        </div>
        <!-- add member section -->
        <Dialog>
            <DialogTrigger as-child>
                <Button class="fixed shadow-xl bottom-[80px] right-[80px] h-12 bg-medcolor-blue hover:bg-medcolor-green">
                    <icon name="uil:plus-circle" class="size-6"></icon>
                    <p>Add Member</p>
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle class="text-3xl text-medcolor-blue font-bold">Add member</DialogTitle>
                    <DialogDescription>
                    Make sure to input all fields before you submit
                    </DialogDescription>
                </DialogHeader>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right text-medcolor-green font-bold">
                            Name
                        </Label>
                        <Input v-model="newMember.name" type="text" placeholder="alex simpson" id="name" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="email" class="text-right text-medcolor-green font-bold">
                            Email
                        </Label>
                        <Input v-model="newMember.email" type="text" placeholder="alex@example.com" id="email"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="age" class="text-right text-medcolor-green font-bold">
                            Age
                        </Label>
                        <Input v-model="newMember.age" type="number" placeholder="30" id="age"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="salary" class="text-right text-medcolor-green font-bold">
                            Salary
                        </Label>
                        <Input v-model="newMember.salary" type="number" placeholder="200000" id="salary"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="position" class="text-right text-medcolor-green font-bold">
                            Position
                        </Label>
                        <Input v-model="newMember.position" type="text" placeholder="accountant" id="position"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="surety" class="text-right text-medcolor-green font-bold">
                            Surety
                        </Label>
                        <Input v-model="newMember.surety" type="text" placeholder="Jhon" id="surety"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="suretyDocument" class="text-right text-medcolor-green font-bold">
                            Surety Document
                        </Label>
                        <Input @change="handleFileUpload($event, 'suretyDocument')" accept=".pdf" required type="file" id="suretyDocument"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="educationalDocument" class="text-right text-medcolor-green font-bold">
                            Educational Document
                        </Label>
                        <Input @change="handleFileUpload($event, 'educationalDocument')" accept=".pdf" required type="file" id="educationalDocument"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="codeNumber" class="text-right text-medcolor-green font-bold">
                            Code Number
                        </Label>
                        <Input v-model="newMember.codeNumber" type="text" placeholder="we238alex" id="codeNumber"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="status" class="text-right text-medcolor-green font-bold">
                            Status
                        </Label>
                        <Select v-model="newMember.status" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3">
                            <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                <SelectLabel>--- Status ---</SelectLabel>
                                <SelectItem value="Individual">
                                Individual
                                </SelectItem>
                                <SelectItem value="Branch">
                                Branch
                                </SelectItem>
                            </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button type="button" variant="outline" class="border-medcolor-blue px-12 text-medcolor-blue hover:border-medcolor-green hover:text-medcolor-green hover:bg-transparent">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" @click="handleAdd" class="bg-medcolor-blue px-12 hover:bg-medcolor-green">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup>
import { useMembers } from '~/composables/useMembers';
const { members, addMember, fetchMembers, updateMember, deleteMember } = useMembers();

// ref value for add member inputs
const newMember = ref({
    name: '',
    email: '',
    age: 0,
    position: '',
    salary: 0,
    status: 'Individual',
    surety: '',
    suretyDocument: '',
    educationalDocument: '',
    codeNumber: ''
});

// fetch members data from database
await fetchMembers();

// fetch member and reset pagination
const fetchAndResetPage = async () => {
    await fetchMembers();
    currentPage.value = 1; // Reset pagination to first page
};

const currentPage = ref(1); // Current page number
const pageSize = 4; // Members per page

// Paginated members
const paginatedMembers = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return members.value.slice(start, start + pageSize);
});

// Function to change the uploaded document to Base64 string
const handleFileUpload = (event, field, member = newMember.value) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Convert PDF to Base64

        reader.onload = () => {
            member[field] = reader.result; // Store Base64 string
        };

        reader.onerror = (error) => {
            console.error('Error converting PDF to Base64:', error);
        };
    }
};

// Function to add new members to the databse
const handleAdd = async () => {
    if (newMember.value.name && newMember.value.email) {
        await addMember(newMember.value);
        alert("Member: " + newMember.value.name + " added SUCCESSFULLY")
        newMember.value = {
            name: '',
            email: '',
            age: 0,
            position: '',
            salary: 0,
            status: 'Individual',
            surety: '',
            suretyDocument: '',
            educationalDocument: '',
            codeNumber: ''
        };
        await fetchAndResetPage();
        console.log("Member: " + newMember.value.name + " added SUCCESSFULLY")
    }
};

//Function to delete a member
const handleDelete = async (id) => {
    if (confirm('Are you sure want to remove this member') == true) {
        await deleteMember(id);
        alert("Member Removed successfully");
        await fetchAndResetPage();
    } else {
        alert("canceled");
    }
};

// Function to update a member's information
const handleUpdate = async (selectedMember) => {
  if (selectedMember) {
    await updateMember(selectedMember._id, selectedMember);
    alert('Member updated successfully!');
    await fetchAndResetPage();
  }
};
</script>