import { Result } from './../../models/result.model';
import { Staff } from './../../models/staff.model';
import { StaffService } from './../../services/staff.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  staffs: Staff[];
  party_name: String;
  newStaff: Staff;
  party_id: number;
  constructor(private dialogRef: MatDialogRef<StaffComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private staffService: StaffService,
    private snackbar: MatSnackBar) {
      this.staffs = data.staffs as Staff[];
      this.party_name = data.party_name as String;
      this.party_id = data.party_id as number;
      console.log('ss', this.staffs);
    }

  ngOnInit() {
    this.setNewStaff();
  }

  close() {
    this.dialogRef.close(null);
  }

  async getStaffs (party_id: number) {
    await this.staffService.getStaffs(party_id).then((res: Result) => {
      this.staffs = res.data;
    });
  }

  setNewStaff() {
    this.newStaff = {
      id: 0,
      party_id: this.party_id,
      name: '',
      email: '',
      mobile: ''
    };
  }

  updateStaff (staff: Staff) {
    this.staffService.updateStaff(staff).then(res => {
      if (res) {
        this.snackbar.open(`${staff.name} Successfully modified.`, '', { duration: 1000 });
      } else {
        this.snackbar.open(`${staff.name} Could NOT be modified.`, '', { duration: 1000 });
      }
    });
  }

  addStaff (staff: Staff) {
    this.staffService.addStaff(staff).then(res => {
      if (res) {
        this.staffs.push(res);
        this.snackbar.open(`${staff.name} Successfully modified.`, '', { duration: 1000 });
      } else {
        this.snackbar.open(`${staff.name} Could NOT be modified.`, '', { duration: 1000 });
      }
      this.setNewStaff();
    });
  }

  deleteStaff (staff: Staff) {
    this.staffService.deleteStaff(staff.id).then(res => {
      if (res) {
        this.getStaffs(this.party_id);
        this.snackbar.open(`${staff.name} Successfully deleted.`, '', { duration: 1000 });
      } else {
        this.snackbar.open(`${staff.name} Could NOT be deleted.`, '', { duration: 1000 });
      }
    });
  }
}
