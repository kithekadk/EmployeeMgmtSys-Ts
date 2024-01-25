let toggleform = document.querySelector('#toggleform') as HTMLButtonElement;
let createEmployeeform = document.querySelector('.createEmployeeform') as HTMLFormElement

let username = document.querySelector('#name') as HTMLInputElement
let email = document.querySelector('#email') as HTMLInputElement
let phone = document.querySelector('#phone') as HTMLInputElement
let kra = document.querySelector('#kra') as HTMLInputElement
let profile = document.querySelector('#profile') as HTMLInputElement
let department = document.querySelector('#department') as HTMLInputElement
let salary = document.querySelector('#salary') as HTMLInputElement
let employment_date = document.querySelector('#employment_date') as HTMLInputElement
let bankaccount_no = document.querySelector('#bankaccount_no') as HTMLInputElement
let role = document.querySelector('#role') as HTMLInputElement

let profiles = document.querySelector('.profiles') as HTMLTableElement


toggleform.addEventListener("click", (()=>{
    if(createEmployeeform.style.display == 'none'){
        createEmployeeform.style.display = 'flex'
        toggleform.textContent = 'Close Form'
        toggleform.style.backgroundColor = 'red'
    }else{
        createEmployeeform.style.display = 'none'
        toggleform.textContent = 'Add User'
        toggleform.style.backgroundColor = '#0c63dd'
    }
}))

interface Employee{
    id: number;
    name: string;
    email: string;
    phone: string;
    kra: string;
    profile: string;
    department: string;
    salary: string;
    employment_date: string;
    bankaccount_no: string;
    role: string
}

let Employees: Employee[] = []

createEmployeeform.addEventListener("submit", (e)=>{
    e.preventDefault()

    let employee = username.value.trim() != "" && email.value.trim() != "" && phone.value.trim() != "" && kra.value.trim() != "" && profile.value.trim() != "" && department.value.trim() != "" && salary.value.trim() != "" && employment_date.value.trim() != "" && bankaccount_no.value.trim() != "" && role.value.trim() != ""

    if(employee){
        let newEmployee = {
            id: Employees.length + 1,
            name: username.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            kra: kra.value.trim(),
            profile: profile.value.trim(),
            department: department.value.trim(),
            salary: salary.value.trim(),
            employment_date: employment_date.value.trim(),
            bankaccount_no: bankaccount_no.value.trim(),
            role: role.value.trim()
        }

        console.log(newEmployee);

        Employees.push(newEmployee)

        instance.displayEmployees()
        
    }
})

class EmployeeActions{

    displayEmployees(){

        let allprofiles = document.querySelectorAll('.profiles .profile') as NodeListOf<HTMLDivElement>

        allprofiles.forEach(el=>{
            el.remove()
        })

        Employees.forEach((employee: Employee, index:number)=>{

            let profile = <HTMLTableRowElement >document.createElement('tr')
            profile.className = "profile"

            let numbering = document.createElement('td') as HTMLTableCellElement
            numbering.textContent = `${index + 1}`

            let profile_url = document.createElement('img') as HTMLImageElement
            profile_url.setAttribute("src", employee.profile)
            profile_url.className= "profileUrl"

            let name = document.createElement('td') as HTMLTableCellElement
            name.textContent = employee.name

            let email = document.createElement('td') as HTMLTableCellElement
            email.textContent = employee.email

            let contact = document.createElement('td') as HTMLTableCellElement
            contact.textContent = employee.phone

            let department = document.createElement('td') as HTMLTableCellElement
            department.textContent = employee.department

            let role = document.createElement('td') as HTMLTableCellElement
            role.textContent = employee.role

            let salary = document.createElement('td') as HTMLTableCellElement
            salary.textContent = employee.salary

            let deletebtn = document.createElement('button') as HTMLButtonElement
            deletebtn.textContent = "Delete"
            deletebtn.style.backfaceVisibility = 'red'
            deletebtn.addEventListener('click', ()=>{
                this.deleteEmployee(index)
            })

            profile.appendChild(numbering)
            profile.appendChild(profile_url)
            profile.appendChild(name)
            profile.appendChild(email)
            profile.appendChild(contact)
            profile.appendChild(department)
            profile.appendChild(role)
            profile.appendChild(salary)
            profile.appendChild(deletebtn)

            profiles.appendChild(profile)

        })
    }

    deleteEmployee(index:number){
        Employees.splice(index, 1)

        this.displayEmployees()
    }

}

let instance = new EmployeeActions()

instance.displayEmployees()