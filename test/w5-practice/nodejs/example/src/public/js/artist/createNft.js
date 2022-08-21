//initialize the plugins
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginImageTransform
);

// Get a reference to the file input element
const inputElement = document.querySelector('input[type="file"]');

// Create a FilePond instance
const pond = FilePond.create(inputElement, {
    imageResizeTargetWidth: 256,
    imageResizeMode: "contain",

    //callback when the image is added
    onaddfile: (err, fileItem) => {
        console.log(err, fileItem.getMetadata("resize"));
    },
    imageTransformVariants: {
        thumb_medium_: (transforms) => {
            transforms.resize.size.width = 512;
            return transforms;
        },
        thumb_small_: (transforms) => {
            transforms.resize.size.width = 64;
            return transforms;
        },
    },
});

function submit() {
    // agreeBtn();
    //작품명

    let fileName = document.querySelector(".filepond--label-action");
    let art_name = document.getElementById("inputGroup").value;
    let art_price = document.getElementById("eth-v").value;
    let art_description = document.getElementById("des").value;
    let serial_number = document.getElementById("serialNumber").value;
    let artist_quotes = document.getElementById("quotes").value;

    console.log(fileName);

    const req = new FormData();

    req.append("art_name", art_name);
    req.append("art_price", art_price);
    req.append("art_description", art_description);
    req.append("serial_number", serial_number);
    req.append("artist_quotes", artist_quotes);
    req.append("art", fileName.files);

    console.log(req);

    // fetch("/registerArt", {
    //         method: "POST",
    //         body: req,
    //     })
    //         .then((res) => res.json())
    //         .then((res) => {
    //             if (res.success) {
    //                 // location.href = "/login";
    //                 alert(res.success);
    //             } else {
    //                 if (res.err) return alert(res.err);
    //                 alert(res.msg);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Error occurs on register");
    //         });
}

function agreeBtn() {
    var chkbox = document.getElementsByName("agree");
    var chk = false;

    for (var i = 0; i < chkbox.length; i++) {
        if (chkbox[i].checked) {
            chk = true;
        } else {
            chk = false;
        }
    }

    if (chk) {
        alert("발행이 완료됐습니다");
        return false;
    } else {
        alert("모든 약관에 동의해 주세요.");
        return;
    }
}
