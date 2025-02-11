<template>
    <div class="w-full flex flex-col gap-12 pb-12">
        <!-- navbar -->
        <div class="flex shadow-md sticky top-0 justify-between pt-4 pb-4 px-[48px] bg-white">
            <img src="../assets/images/medtechlogo.png" alt="Medtech Logo" class="cursor-pointer w-36 h-auto"/>
            <div class="flex items-center gap-4 ">
                <Button @click="logout" variant="outline" class="border-medcolor-blue text-medcolor-blue hover:border-medcolor-green hover:text-medcolor-green hover:bg-transparent">
                    Logout
                </Button>
                <div class="flex items-center gap-4 ml-24">
                    <!-- <img src="../assets/images/hrProfilePic.jpg" alt="HR Profile Picture" class="w-12 h-12 rounded-full object-cover"/> -->
                    <icon name="material-symbols:account-circle-full" class="size-11 rounded-full text-medcolor-blue p-2" />
                    <div>
                        <p class="text-medcolor-green font-bold capitalize">{{ logedInUser.name }}</p>
                        <p class="text-sm text-medcolor-blue font-medium">{{ logedInUser.email }}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- intro section -->
        <div class="flex items px-[48px] gap-24">
            <img src="../assets/images/dashboardImage.jpg" alt="Dashboard Image" class="w-[800px] object-cover h-[400px] rounded-lg"/>
            <div class="flex flex-col gap-16">
                <p class="text-6xl text-medcolor-blue font-bold">Welcome, <span class="text-medcolor-green capitalize">{{ logedInUser.name }}</span>👋</p>
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
                <Input type="text" v-model="searchQuery" placeholder="Search by name, email, position, ..." class="pl-12 h-full" />
                <icon name="uil:search" class="absolute left-2 size-6 text-gray-300 ring-2 ring-red-500"/>
                <Button @click="handleSearch" type="submit" class="bg-medcolor-blue hover:bg-medcolor-green h-full px-12">Search</Button>
            </div>
         </div>
         <RadioGroup v-model="filterState" class="flex px-[48px] gap-6 -my-3" default-value="all">
            <div class="flex items-center space-x-2">
                <RadioGroupItem class="size-5 hover:text-medcolor-green hover:border-medcolor-green text-medcolor-blue border-medcolor-blue" id="r1" value="all" />
                <Label class="text-base text-medcolor-green font-bold" for="r1">All</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem class="size-5 hover:text-medcolor-green hover:border-medcolor-green text-medcolor-blue border-medcolor-blue" id="r2" value="active" />
                <Label class="text-base text-medcolor-green font-bold" for="r2">Active</Label>
            </div>
            <div class="flex items-center space-x-2">
                <RadioGroupItem class="size-5 hover:text-medcolor-green hover:border-medcolor-green text-medcolor-blue border-medcolor-blue" id="r3" value="deactivated" />
                <Label class="text-base text-medcolor-green font-bold" for="r3">Deactivated</Label>
            </div>
        </RadioGroup>
        <!-- table section -->
        <div class="px-[48px]">
            <Skeleton v-if="isLoadingMembers" class="bg-gray-300 h-96 w-full" />
            <Table v-else class="border-[1px]">
                <TableCaption>A list of registered members.</TableCaption>
                <TableHeader class="bg-white">
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead class="text-center">Profile Picture</TableHead>
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
                        <TableHead class="text-center">Start Date</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead class="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody class="font-medium text-base">
                    <Dialog v-for="member of paginatedMembers" :key="member.id">
                        <DialogTrigger as-child>
                            <TableRow class="hover:bg-[#e1edf8] cursor-pointer">
                                <TableCell>{{ member._id }}</TableCell>
                                <TableCell class="flex justify-center">
                                    <div v-if="member.profilePicture">
                                        <img class="size-10 rounded-full object-cover" :src="member.profilePicture" :alt="member.name + 's pic'"/>
                                    </div>
                                    <div v-else>
                                        <icon class="text-medcolor-green size-10" name="material-symbols:account-circle-full"/>
                                    </div>
                                </TableCell>
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
                                <TableCell class="text-center w-36">{{ formatDate(member.startDate, 'short') }}</TableCell>
                                <TableCell :class="member.deactivated ? 'text-red-600':'text-green-500'">{{ member.deactivated ? 'Deactivated' : 'Active' }}</TableCell>
                                <TableCell class="">
                                    <DropdownMenu class="relative">
                                        <DropdownMenuTrigger as-child>
                                            <button @click="openDropdown" class="text-xl py-2 w-full">
                                                <icon name="tabler:dots-vertical"/>
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent class="absolute -right-5">
                                            <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator /> -->
                                            <Dialog>
                                                <DialogTrigger as-child>
                                                    <DropdownMenuItem class="text-medcolor-blue cursor-pointer font-medium" @select.prevent>
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
                                                        <div class="grid grid-cols-4 items-center justify-self-start gap-4">
                                                            <p class="text-right text-medcolor-green font-bold">Profile picture</p>
                                                            <label for="profilePicture" class="relative w-24 h-24 rounded-full border-2 border-dashed border-medcolor-blue flex items-center justify-center col-span-3 cursor-pointer overflow-hidden">
                                                                <!-- Show uploaded image if available -->
                                                                <img v-if="member.profilePicture" :src="member.profilePicture" alt="Profile Picture" class="absolute w-full h-full object-cover rounded-full" />
                                                                <!-- Add Image Icon (Displayed before upload) -->
                                                                <div v-if="!member.profilePicture" class="flex flex-col items-center justify-center text-medcolor-blue">
                                                                    <icon name="uil:image-plus" class="w-8 h-8" />
                                                                    <p class="text-xs text-medcolor-blue">Add Image</p>
                                                                </div>
                                                                <!-- Edit Icon (Displayed after upload) -->
                                                                <div v-if="member.profilePicture" class="absolute flex items-center justify-center size-7 bg-gray-700 bg-opacity-75 p-1 rounded-full">
                                                                    <icon name="uil:pen" class="text-white" />
                                                                </div>
                                                                <!-- Hidden File Input -->
                                                                <input @change="handleFileUpload($event, 'profilePicture', member)" accept="image/*" type="file" id="profilePicture"  class="hidden"/>
                                                            </label>
                                                        </div>
                                                        <div class="grid grid-cols-4 items-center gap-4">
                                                            <Label class="text-right text-medcolor-green font-bold">
                                                                Start date
                                                            </Label>
                                                            <Popover>
                                                                <PopoverTrigger as-child>
                                                                <Button
                                                                    variant="outline"
                                                                    :class="cn(
                                                                    'w-[280px] justify-start text-left font-normal',
                                                                    !member.startDate && 'text-muted-foreground',
                                                                    )"
                                                                >
                                                                    <icon name="uil:calender" class="mr-2 h-4 w-4" />
                                                                    {{ updatedStartDate ? updatedStartDate : formatDate(member.startDate, 'iso') }}
                                                                </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent class="w-auto p-0">
                                                                <Calendar v-model="updatedStartDate" initial-focus />
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
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
                                                                <SelectContent class="h-[240px]">
                                                                    <SelectGroup>
                                                                        <SelectLabel>--- Status ---</SelectLabel>
                                                                        <SelectItem v-for="status of statusTypes" :key="status" :value="status">
                                                                            {{status}}
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
                                                            <span v-if="!isSaving">Save</span>
                                                            <span v-else class="flex items-center gap-2">
                                                                <icon name="line-md:loading-twotone-loop" class="size-4"/>
                                                                <p>Saving...</p>
                                                            </span>
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <DropdownMenuItem @click="toggleMemberState(member)" class="text-medcolor-blue cursor-pointer font-medium">
                                                <icon v-if="member.deactivated" name="uil:play" />
                                                <span v-if="member.deactivated" class="ml-2">Activate</span>
                                                <icon v-if="!member.deactivated" name="uil:pause" />
                                                <span v-if="!member.deactivated" class="ml-2">Deactivate</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem @click="handleDelete(member._id)" class="text-red-500 cursor-pointer font-medium">
                                                <icon name="uil:trash-alt" />
                                                <span class="ml-2">Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[700px]">
                            <DialogHeader>
                                <DialogTitle class="text-3xl text-medcolor-blue font-bold">Member Information</DialogTitle>
                                <DialogDescription class="flex justify-between">
                                    <p>The following is full information of a regisered member</p>
                                </DialogDescription>
                            </DialogHeader>
                            <!-- clicked member information -->
                            <div class="grid grid-cols-2 gap-y-6 gap-x-0 py-4">
                                <img v-if="member.profilePicture" class="size-24 mb-4 justify-self-center rounded-full object-cover col-span-2" :src="member.profilePicture" :alt="member.name + 's picture'" />
                                <icon v-else name="material-symbols:account-circle-full" class="text-medcolor-green size-24 justify-self-center col-span-2 mb-4"/>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Name: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.name }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Email: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.email }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Age: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.age }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Salary: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.salary }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Position: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.position }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Surety: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.surety }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Surety Document: </p>
                                    <a v-if="member.suretyDocument" :href="member.suretyDocument" target="_blank"><icon name="uil:file-alt" class="text-xl"/></a>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Educational Document: </p>
                                    <a v-if="member.educationalDocument" :href="member.educationalDocument" target="_blank"><icon name="uil:file-alt" class="text-xl"/></a>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Code Number: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.codeNumber }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Status: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ member.status }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">State: </p>
                                    <p class="font-semibold text-lg" :class="member.deactivated ? 'text-red-500' : 'text-green-500'">{{ member.deactivated ? 'Deactivated' : 'Active' }}</p>
                                </div>
                                <div class="flex items-center gap-4">
                                    <p class="text-medcolor-blue font-bold">Start Date: </p>
                                    <p class="text-medcolor-green font-semibold text-lg">{{ formatDate(member.startDate, 'short')}}</p>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose as-child>
                                    <Button type="button" class="bg-medcolor-blue px-12 hover:bg-medcolor-green mt-8">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </TableBody>
            </Table>
        </div>
        <!-- pagination -->
        <div class="px-[48px] w-full flex justify-center">
            <Pagination v-slot="{ page }" v-model:page="currentPage" :total="searchedMebmers.length" :items-per-page="pageSize" :sibling-count="1" show-edges>
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
                    <DialogDescription class="flex justify-between">
                        <p>Make sure to input all fields before you submit</p>
                        <p @click="resetFields" class="text-medcolor-blue font-bold cursor-pointer underline">Clear</p>
                    </DialogDescription>
                </DialogHeader>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <div class="grid grid-cols-4 items-center justify-self-start gap-4">
                        <p class="text-right text-medcolor-green font-bold">Profile Picture</p>
                        <label for="profilePicture" class="relative w-24 h-24 rounded-full border-2 border-dashed border-medcolor-blue flex items-center justify-center col-span-3 cursor-pointer overflow-hidden">
                            <!-- Show uploaded image if available -->
                            <img v-if="newMember.profilePicture" :src="newMember.profilePicture" alt="Profile Picture" class="absolute w-full h-full object-cover rounded-full" />
                            <!-- Add Image Icon (Displayed before upload) -->
                            <div v-if="!newMember.profilePicture" class="flex flex-col items-center justify-center text-medcolor-blue">
                                <icon name="uil:image-plus" class="w-8 h-8" />
                                <p class="text-xs text-medcolor-blue">Add Image</p>
                            </div>
                            <!-- Edit Icon (Displayed after upload) -->
                            <div v-if="newMember.profilePicture" class="absolute flex items-center justify-center size-7 bg-gray-700 bg-opacity-75 p-1 rounded-full">
                                <icon name="uil:pen" class="text-white" />
                            </div>
                            <!-- Hidden File Input -->
                            <input @change="handleFileUpload($event, 'profilePicture')" accept="image/*" type="file" id="profilePicture"  class="hidden"/>
                        </label>
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label class="text-right text-medcolor-green font-bold">
                            Start date
                        </Label>
                        <Popover>
                            <PopoverTrigger as-child>
                            <Button
                                variant="outline"
                                :class="[
                                    'w-[280px] justify-start text-left font-normal',
                                    !startDate ? 'text-muted-foreground' : '',
                                    errors.name ? 'border-red-500' : '',
                                ]"
                            >
                                <icon name="uil:calender" class="mr-2 h-4 w-4" />
                                {{ startDate ? df.format(startDate.toDate(getLocalTimeZone())) : "Pick a date" }}
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent class="w-auto p-0">
                            <Calendar v-model="startDate" initial-focus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right text-medcolor-green font-bold">
                            Name
                        </Label>
                        <Input v-model="name" :="nameAttrs" type="text" placeholder="alex simpson" id="name" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.name ? 'border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="email" class="text-right text-medcolor-green font-bold">
                            Email
                        </Label>
                        <Input v-model="email" :="emailAttrs" type="text" placeholder="alex@example.com" id="email"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.email ? 'border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="age" class="text-right text-medcolor-green font-bold">
                            Age
                        </Label>
                        <Input v-model="age" :="ageAttrs" type="number" placeholder="30" id="age"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.age ? 'border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="salary" class="text-right text-medcolor-green font-bold">
                            Salary
                        </Label>
                        <Input v-model="salary" :="salaryAttrs" type="number" placeholder="200000" id="salary"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.salary ? 'border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="position" class="text-right text-medcolor-green font-bold">
                            Position
                        </Label>
                        <Input v-model="position" :="positionAttrs" type="text" placeholder="accountant" id="position"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.position ? 'border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="surety" class="text-right text-medcolor-green font-bold">
                            Surety
                        </Label>
                        <Input v-model="surety" :="suretyAttrs" type="text" placeholder="Jhon" id="surety"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.surety ? 'border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="suretyDocument" class="text-right text-medcolor-green font-bold">
                            Surety Document
                        </Label>
                        <Input @change="handleFileUpload($event, 'suretyDocument')" accept=".pdf" required type="file" id="suretyDocument"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.suretyDocument ? 'border-[1px] border-red-500' : ''"  />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="educationalDocument" class="text-right text-medcolor-green font-bold">
                            Educational Document
                        </Label>
                        <Input @change="handleFileUpload($event, 'educationalDocument')" accept=".pdf" required type="file" id="educationalDocument"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.educationalDocument ? 'border-[1px] border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="codeNumber" class="text-right text-medcolor-green font-bold">
                            Code Number
                        </Label>
                        <Input v-model="codeNumber" :="codeNumberAttrs" type="text" placeholder="we238alex" id="codeNumber"  class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3" :class="errors.codeNumber ? 'border-red-500' : ''" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="status" class="text-right text-medcolor-green font-bold">
                            Status
                        </Label>
                        <Select v-model="status" :="statusAttrs" class="text-black font-medium placeholder:text-gray-400 placeholder:font-light col-span-3">
                            <SelectTrigger class="w-[180px]" :class="errors.status ? 'border-[1px] border-red-500' : ''">
                            <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent class="h-[240px]">
                                <SelectGroup>
                                    <SelectLabel>--- Status ---</SelectLabel>
                                    <SelectItem v-for="status of statusTypes" :key="status" :value="status">
                                        {{status}}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div class="flex flex-wrap mb-4 gap-x-2 gap-y-[1px] text-red-500 text-sm font-medium">
                    <p class="text-medcolor-blue mr-2 font-black">Message: </p>
                    <p v-if="errors.name">{{ errors.name }}</p>
                    <p v-if="errors.email">{{ errors.email }}</p>
                    <p v-if="errors.age">{{ errors.age }}</p>
                    <p v-if="errors.salary">{{ errors.salary }}</p>
                    <p v-if="errors.position">{{ errors.position }}</p>
                    <p v-if="errors.surety">{{ errors.surety }}</p>
                    <p v-if="errors.codeNumber">{{ errors.codeNumber }}</p>
                    <p v-if="errors.status">{{ errors.status }}</p>
                    <p v-if="errors.startDate">{{ errors.startDate }}</p>
                    <p v-if="errors.suretyDocument">{{ errors.suretyDocument }}</p>
                    <p v-if="errors.educationalDocument">{{ errors.educationalDocument }}</p>
                    <!-- <p v-if="response">{{ response.error }}</p>
                    <p v-if="response" class="text-green-500">{{ response.message }}</p> -->
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button type="button" variant="outline" class="border-medcolor-blue px-12 text-medcolor-blue hover:border-medcolor-green hover:text-medcolor-green hover:bg-transparent">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" @click="handleAdd" class="bg-medcolor-blue px-12 hover:bg-medcolor-green">
                        <span v-if="!isSubmitting">Submit</span>
                        <span v-else class="flex items-center gap-2">
                            <icon name="line-md:loading-twotone-loop" class="size-4"/>
                            <p>Submitting...</p>
                        </span>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup>
import { useMembers } from '~/composables/useMembers';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import {  DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { cn } from '~/lib/utils'

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

function formatDate(dateObj, format = 'short') {
  const { year, month, day } = dateObj;

  // Ensure month is zero-padded (e.g., 2 -> 02)
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');

  // Month names for the "short" format
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  if (format === 'short') {
    // Format as "13 Feb, 2025"
    return `${day} ${monthNames[month - 1]}, ${year}`;
  } else if (format === 'iso') {
    // Format as "2025-02-13" (ISO format)
    return `${year}-${paddedMonth}-${paddedDay}`;
  } else {
    throw new Error('Invalid format option. Use "short" or "iso".');
  }
}

const updatedStartDate = ref('');

// drop down ref
const activeDropdown = ref(null);
const openDropdown = (event) => {
    event.stopPropagation(); // Ensure dropdown click does not propagate
    activeDropdown.value = true; // Set dropdown as active
};

// fetch user(hr) data
const client = useSupabaseClient()
const user = useSupabaseUser()
definePageMeta({
    middleware: ['auth']
})

// declare the functions and consts from use member
const { members, addMember, fetchMembers, updateMember, deleteMember } = useMembers();

// script to show a loading UI while fetching members, adding members and editing member data
const isLoadingMembers = ref(true);
const isSubmitting = ref(false);
const isSaving = ref(false);

// fetch members and show that loading is finished
await fetchMembers();
isLoadingMembers.value = false

// store login information
const logedInUser = ref({
    name: user.value.user_metadata.name,
    email: user.value.email
})

// function to log out
const logout = async () => {
    await client.auth.signOut()
    navigateTo('/login')
}

// send not loged in user to login page
onMounted(() => {
    watchEffect(() => {
        if(!user.value) {
            navigateTo('/login')
        } else {
            logedInUser.value.name = user.value.user_metadata.name,
            logedInUser.value.email = user.value.email
        }
    })
})

// options for status field
const statusTypes = ref(["Individual", "EAAZ(AA)", "SAAZ(AA)", "SWAAZ(AA)", "WAAZ(AA)", "NAAZ(AA)", "IMMIGRATION(AA)", "CAAZ(AA)", "NR(AXUM)", "NR(ADIGRAT)", "NR(SHIRE)", "NR(ADWA)", "SR(HAWASSA)", "SR(SHASHEMENE)", "SER(ZEWAY)", "SER(ADAMA)", "NER(KOMBOLCHA)", "NER(DESSIE)", "CNR(DIBRE BRIHAN)", "CNR(FICHE)", "CNR(SULULTA)", "NEER(SEMERA)", "NEER(AWASH)", "SSWR(SODO)", "SSWR(ARBAMINCH)"]);

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
    codeNumber: '',
    profilePicture: '',
    startDate: '',
});

// validation setting
// validation check function
const schema = yup.object({
    name: yup.string().required('Name is required'),
    surety: yup.string().required('Surety is required'),
    suretyDocument: yup.string().required('Surety document is required'),
    educationalDocument: yup.string().required('Educational document is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    age: yup.number().positive('Age must be positive').required('Age is required'),
    position: yup.string().required('Position is required'),
    salary: yup.number().positive('Salary must be positive').required('Salary is required'),
    codeNumber: yup.string().required('Code Number is required'),
    status: yup.string().required('Status is required'),
    profilePicture: yup.string().nullable(),
    startDate: yup.string().required('Start Date is required'),
});

//validation schema
const { handleSubmit, resetForm, errors, defineField } = useForm({
    validationSchema: schema,
});

const [name, nameAttrs] = defineField('name');
const [surety, suretyAttrs] = defineField('surety');
const [suretyDocument, suretyDocumentAttrs] = defineField('suretyDocument');
const [educationalDocument, educationalDocumentAttrs] = defineField('educationalDocument');
const [email, emailAttrs] = defineField('email');
const [age, ageAttrs] = defineField('age');
const [position, positionAttrs] = defineField('position');
const [salary, salaryAttrs] = defineField('salary');
const [codeNumber, codeNumberAttrs] = defineField('codeNumber');
const [status, statusAttrs] = defineField('status');
const [profilePicture, profilePictureAttrs] = defineField('profilePicture');
const [startDate, startDateAttrs] = defineField('startDate');

// fetch member and reset pagination
const fetchAndResetPage = async () => {
    await fetchMembers();
    filteredMembers.value = members.value; // Reset the filtered list to include all members
    currentPage.value = 1; // Reset pagination to the first page
};

const searchQuery = ref(''); // inputed value in the search field
const filterState = ref('all') // filter state (activated, deactivated, all)
const currentPage = ref(1); // Current page number
const pageSize = 4; // Members per page
const filteredMembers = ref(members.value); // Store filtered members
const searchedMebmers = ref(filteredMembers.value) // Store searched members

// Paginate the filtered then searched members
const paginatedMembers = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return searchedMebmers.value.slice(start, start + pageSize);
});

// clear the search filter if search input is empty
watch(searchQuery, (newValue) => {
  if (newValue.trim() === '') {
    // If searchQuery is empty, reset the seached members to the full members list that are filtered
    searchedMebmers.value = filteredMembers.value;
  }
});

// Watch for filter state changes and apply it
watch([members, filterState], () => {
    handleDeactivateStateFilter();
    searchQuery.value = '' // clear the search bar when filter is applied
});

// Function to apply deactivate state filter
const handleDeactivateStateFilter = () => {
    let result = members.value;

    // Apply filter
    if (filterState.value === 'active') {
        result = result.filter(member => !member.deactivated);
    } else if (filterState.value === 'deactivated') {
        result = result.filter(member => member.deactivated);
    }

    filteredMembers.value = result;
    searchedMebmers.value = filteredMembers.value
    currentPage.value = 1; // Reset to first page when filtering
};

// Update searched members when search is triggered
const handleSearch = () => {
    // search members based on the search query
    if (!searchQuery.value.trim()) {
        searchedMebmers.value = filteredMembers.value; // If search is empty, show all members
    } else {
        const query = searchQuery.value.toLowerCase();
        searchedMebmers.value = filteredMembers.value.filter(member =>
            member.name.toLowerCase().includes(query) ||
            member.email.toLowerCase().includes(query) ||
            member.position.toLowerCase().includes(query) ||
            member.surety.toLowerCase().includes(query) ||
            member.codeNumber.toLowerCase().includes(query) ||
            member.status.toLowerCase().includes(query)
        );
    }
    currentPage.value = 1; // Reset to first page on search
};

// Function to change the uploaded document to Base64 string
const handleFileUpload = (event, field, member = newMember.value) => {
    const file = event.target.files[0];
    if (field == 'suretyDocument'){
        suretyDocument.value = file;
    } else if ( field == 'educationalDocument') {
        educationalDocument.value = file;
    }

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

// Sync vee-validate fields with newMember
const fields = { name, email, age, position, salary, surety, suretyDocument, educationalDocument, codeNumber, status, profilePicture, startDate };
Object.entries(fields).forEach(([key, field]) => {
  watch(field, (newValue) => {
    newMember.value[key] = newValue;
  });
});

// Function to add new members to the databse
const handleAdd = handleSubmit(async () => {
    isSubmitting.value = true;
    const response = await addMember(newMember.value);

    if (response?.error) {
        console.error("Failed to add member:", response.error);
        // Display user-friendly error message
        alert("❗ Error: " + response.error);
        isSubmitting.value = false;
    } else {
        console.log("Success:", response.member);
        alert("✅ Member: " + newMember.value.name + " added SUCCESSFULLY");
        isSubmitting.value = false;
        // Reset form fields
        resetFields();
        isLoadingMembers.value = true
        await fetchAndResetPage();
        isLoadingMembers.value = false
        handleSearch(); // Re-apply search filter
        filterState.value = 'all' // Reset filter state to all

        // reset new members value
        newMember.value = {
            suretyDocument: '',
            educationalDocument: '',
            profilePicture: '',
        };
    }
});

// Reset function (local)
const resetFields = () => {
    // reset new members value
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
            codeNumber: '',
            profilePicture: '',
            startDate: '',
    };
    resetForm(); // Resets all fields
};

//Function to delete a member
const handleDelete = async (id) => {
    if (confirm('⚠️ Are you sure you want to remove this member? click OK to confirm.') == true) {
        await deleteMember(id);
        alert("✅ Member removed SUCCESSFULLY");
        isLoadingMembers.value = true
        await fetchAndResetPage();
        isLoadingMembers.value = false
        handleSearch(); // Re-apply the search filter
        filterState.value = 'all' // Reset filter state to all
    } else {
        alert("Member deletion process canceled ❌");
    }
};

// Function to update a member's information
const handleUpdate = async (selectedMember) => {
    isSaving.value = true;
    if (selectedMember) {
        selectedMember.startDate = updatedStartDate.value;
        await updateMember(selectedMember._id, selectedMember);
        alert('✅ Member: ' + selectedMember.name + ' updated SUCCESSFULLY!');
        isSaving.value = false;
        isLoadingMembers.value = true
        await fetchAndResetPage();
        isLoadingMembers.value = false
        handleSearch(); // Re-apply the search filter
        filterState.value = 'all' // Reset filter state to all
    }
};

// toggle the deactivated state of a member
const toggleMemberState = async (member) => {
  if (!member || !member._id) return;

  const updatedStatus = !member.deactivated; // Toggle the status

  await updateMember(member._id, { deactivated: updatedStatus });

  alert(
    `✅ Member: ${member.name} has been ${
      updatedStatus ? "deactivated" : "activated"
    } successfully!`
  );

  isLoadingMembers.value = true
  await fetchAndResetPage();
  isLoadingMembers.value = false
  handleSearch(); // Re-apply the search filter
  handleDeactivateStateFilter(); // Re-apply the deactivate state filter
};
</script>