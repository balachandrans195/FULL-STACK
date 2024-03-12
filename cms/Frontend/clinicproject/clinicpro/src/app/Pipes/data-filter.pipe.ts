import { Pipe, PipeTransform } from "@angular/core";
import moment from 'moment';
@Pipe({
    name:'departmentName'
})
export class DepartmentNamePipe implements PipeTransform {
    transform(department:number): any {
      switch(department){
        case 1:
            return 'Gynecologist';
        case 2:
            return 'Cardiologist';
        case 3:
            return 'Neurologist';
        default:
            return 'Department Not Available'
            
      }
    
    }
  }

@Pipe({
    name:'dateFilterPipe'
})
export class DateFilterPipe implements PipeTransform {
    transform(array:any[]): any {

        // const todayAppointments = array.filter(appointment => {
        //     const appointmentDate = moment(appointment.apnt_date);
        //     const today = moment().startOf('day'); // Get the start of today
        
        //     return appointmentDate.isSame(today, 'day');
        // });
        // console.log(todayAppointments);
        
       let result = [];
       const today =  new Date();      
       result = array.filter(s => moment(new Date(s['apnt_date']) ).isSame(today,'day'))       
       console.log(result);
       return result
    }
  }