<template>
    <div class="w-full flex flex-col gap-12 pb-12">
        <!-- navbar -->
        <div class="flex sticky top-0 justify-between pt-4 pb-4 px-[48px] bg-white">
            <img src="~/assets/images/medtechLogo.png" alt="Medtech Logo" class="w-36 h-auto"/>
            <div class="flex items-center gap-4 mr-8">
                <Button variant="outline" class="border-medcolor-blue text-medcolor-blue hover:border-medcolor-green hover:text-medcolor-green hover:bg-transparent">
                    Logout
                </Button>
                <div class="flex gap-4 ml-16">
                    <img src="~/assets/images/hrProfilePic.jpg" alt="HR Profile Picture" class="w-12 h-12 rounded-full object-cover"/>
                    <div>
                        <p class="text-medcolor-green font-bold">Abebe Kebede</p>
                        <p class="text-sm text-medcolor-blue font-medium">abeKebe@example.com</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- intro section -->
        <div class="flex items px-[48px] gap-24">
            <img src="~/assets/images/dashboardImage.jpg" alt="Dashboard Image" class="w-[800px] object-cover h-[400px] rounded-lg"/>
            <div class="flex flex-col gap-16">
                <p class="text-6xl text-medcolor-blue font-bold">Welcome, <span class="text-medcolor-green">Abebe Kebede</span>👋</p>
                <p class="text-xl text-medcolor-blue font-medium">We’re glad to have you on board. Here’s what you can do on your dashboard:</p>
                <ul class="flex flex-col list-disc list-inside bg-[#e7f6e2] p-5 rounded-xl gap-4 text-base text-medcolor-blue font-medium">
                    <li>🔎 <span class="font-extrabold">Search Members:</span> Quickly find employees using the search bar.</li>
                    <li>➕ <span class="font-extrabold">Add New Member:</span> Click the "Add Member" button to register a new employee.</li>
                    <li>📋 <span class="font-extrabold">View Member Data:</span> Browse through the table to see employee details.</li>
                    <li>🛠 <span class="font-extrabold">Manage Profiles:</span> Update or remove employee records as needed.</li>
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
                        <TableHead>N<u>o</u></TableHead>
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
                        <TableCell>{{ member.id }}</TableCell>
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
                            <icon name="tabler:dots-vertical"/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
        <!-- pagination -->
        <div class="px-[48px] w-full flex justify-center">
            <Pagination v-slot="{ page }" v-model:page="currentPage" :total="data.length" :items-per-page="pageSize" :sibling-count="1" show-edges>
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
                    <DialogTitle class="text-2xl font-bold">Add member</DialogTitle>
                    <DialogDescription>
                    Make sure to input all fields before you submit
                    </DialogDescription>
                </DialogHeader>
                <div class="grid grid-cols-2 gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="name" class="text-right">
                            Name
                        </Label>
                        <Input type="text" placeholder="alex simpson" id="name" class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="email" class="text-right">
                            Email
                        </Label>
                        <Input type="text" placeholder="alex@example.com" id="email"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="age" class="text-right">
                            Age
                        </Label>
                        <Input type="number" placeholder="30" id="age"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="salary" class="text-right">
                            Salary
                        </Label>
                        <Input type="number" placeholder="200000" id="salary"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="position" class="text-right">
                            Position
                        </Label>
                        <Input type="text" placeholder="accountant" id="position"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="surety" class="text-right">
                            Surety
                        </Label>
                        <Input type="text" placeholder="Jhon" id="surety"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="suretyDocument" class="text-right">
                            Surety Document
                        </Label>
                        <Input type="file" id="suretyDocument"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="educationalDocument" class="text-right">
                            Educational Document
                        </Label>
                        <Input type="file" id="educationalDocument"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="codeNumber" class="text-right">
                            Code Number
                        </Label>
                        <Input type="text" placeholder="we238alex" id="codeNumber"  class="col-span-3" />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                        <Label for="status" class="text-right">
                            Status
                        </Label>
                        <Select class="col-span-3">
                            <SelectTrigger class="w-[180px]">
                            <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectGroup>
                                <SelectLabel>--- Status ---</SelectLabel>
                                <SelectItem value="individual">
                                Individual
                                </SelectItem>
                                <SelectItem value="branch">
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
                    <Button type="submit" class="bg-medcolor-blue px-12 hover:bg-medcolor-green">
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup>
import { useMembers } from '~/composables/useMembers';
const { data } = useMembers()

const currentPage = ref(1); // Current page number
const pageSize = 4; // Members per page

const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return data.value.slice(start, start + pageSize);
});
</script>