import React, { useState, useEffect } from 'react';

const MedicineDisplay = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch('/medicines')
      .then(response => response.json())
      .then(data => setMedicines(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Dosage</th>
          <th>Exp. Date</th>
          <th>Open Date</th>
          <th>Quantity</th>
          <th>Number</th>
          <th>Location</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {medicines.map(medicine => (
          <tr key={medicine._id}>
            <td>{medicine.name}</td>
            <td>{medicine.dosage}</td>
            <td>{medicine.expDate}</td>
            <td>{medicine.openDate}</td>
            <td>{medicine.quantity}</td>
            <td>{medicine.number}</td>
            <td>{medicine.location}</td>
            <td>{medicine.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicineDisplay;