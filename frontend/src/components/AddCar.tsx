import  Dialog  from "@mui/material/Dialog";
import  DialogActions from "@mui/material/DialogActions";
import  DialogTitle  from "@mui/material/DialogTitle";
import { useState } from "react";
import { Car } from "../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";
import  Button  from "@mui/material/Button";


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
    <Button onClick={handleClickOpen}>New Car</Button>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>New car</DialogTitle>
    <CarDialogContent car={car} handleChange={handleChange}/>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
</>
  );
}

export default AddCar;