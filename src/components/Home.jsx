import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Book from "./Book";
import CityList from "./CityList";
import Pagination from "./Pagination";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(null);
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("Springfield");
  const [open, setOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const fetchDoctorsData = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageNum: pageNum }),
      };
      const response = await fetch(
        "https://bigohealthdevtest.herokuapp.com/doctorList?pageNum=" + pageNum,
        requestOptions
      );
      const fetchedData = await response.json();
      setDoctors(fetchedData.data);
      setTotal(fetchedData.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCitiesData = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        "https://bigohealthdevtest.herokuapp.com/cityList",
        requestOptions
      );
      const fetchedCitiesData = await response.json();
      setCities(fetchedCitiesData.city);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDoctorsPerCityData = async () => {
    try {
      setLoading(true);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityName: city }),
      };
      const response = await fetch(
        "https://bigohealthdevtest.herokuapp.com/doctorList?pageNum=" + pageNum,
        requestOptions
      );
      const fetchedData = await response.json();
      setDoctors(fetchedData.data);
      setTotal(fetchedData.total);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = (doctor) => {
    setOpen(true);
    setSelectedDoctor(doctor);
  };

  useEffect(() => {
    fetchDoctorsData();
    fetchCitiesData();
    fetchDoctorsPerCityData();
  }, [pageNum, city]);

  if (loading) {
    return (
      <Typography variant="h4" align="center">
        Loading... Please wait
      </Typography>
    );
  }

  return (
    <Container sx={{ my: 10, px: 10 }}>
      <Book
        open={open}
        onClose={() => setOpen(false)}
        doctor={selectedDoctor}
      />
      <CityList
        cities={cities}
        city={city}
        cityChange={(newCity) => setCity(newCity)}
      />
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {doctors.map((doctor) => (
          <Grid item key={doctor.docId} xs={12} sm={6} m={3} lg={3}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="300"
                image={doctor.docProfileImgUrl}
                alt={doctor.docName}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {doctor.docName}
                </Typography>
                <Typography gutterBottom variant="subtitle" component="div">
                  Consultation Fees: ₹ {doctor.docConsultationFee}
                </Typography>
                <Typography variant="subtitle">
                  {doctor.docSpecialisation}
                </Typography>
                <Typography variant="subtitle2">
                  {doctor.docYoE} Years of Experience
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.city}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleBooking(doctor)}>
                  Book
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        paginate={(pg) => setPageNum(pg)}
        total={total}
        perPage={doctors.length}
        pageNum={pageNum}
      />
    </Container>
  );
}
