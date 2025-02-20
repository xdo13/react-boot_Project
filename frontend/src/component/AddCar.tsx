import  Dialog  from "@mui/material/Dialog";
import  DialogActions from "@mui/material/DialogActions";
import  DialogContent  from "@mui/material/DialogContent";
import  DialogTitle  from "@mui/material/DialogTitle";
import { useState } from "react";
import { Car } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";


function AddCar(){
  
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // 모달 폼 열기
  const handleClickOpen = () => {
    setOpen(true);

  }

  // 모달 폼 닫기
  const handleClose = () => {
    setOpen(false);

  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]:
      event.target.value});
}

//자동차를 저장하고 모달 폼을 닫음
  const handleSave = () => {
    mutate(car);
    setCar({ brand: '', model: '', color: '', registrationNumber: '',
      modelYear: 0, price: 0});
      handleClose();
    }
  
    
  

  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: '',
    model:  '',
    color:  '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
  });
  return(
    <>
    <button onClick={handleClickOpen}>New Car</button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>New car</DialogTitle>
    <CarDialogContent car={car} handleChange={handleChange}/>
        <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
        </DialogActions>
    </Dialog>
</>
  );
}

export default AddCar;