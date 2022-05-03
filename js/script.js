document.addEventListener('DOMContentLoaded', () => {

    var addLocationForm = document.querySelector('#addLocationForm');

    addLocationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        var fileUpload = addLocationForm.locationIMG.files[0];
        var storageRef = storage.ref(`photos/locations/${fileUpload.name}`);
        var uploadedImage = storageRef.put(fileUpload);
        //var imgURL;
        uploadedImage.on('state_changed', () => {
            uploadedImage.snapshot.ref.getDownloadURL().then((imgURL) => {
                db.collection('locations').doc().set({
                    name: addLocationForm.name.value,
                    latitude: addLocationForm.latitude.value,
                    longitude: addLocationForm.longitude.value,
                    imgURL: imgURL
                }).then(() => {
                    addLocationForm.name.value = '';
                    addLocationForm.latitude.value = '';
                    addLocationForm.longitude.value = '';
                    addLocationForm.locationIMG.value = '';
                    location.reload();
                })
            });
        })


    });

});
