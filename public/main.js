const generatePdf = () => {

  console.log("Loading...");
  $("#loading").show();

  var pengirim = $("input[name=pengirim]").val();
  var nomorPengirim = $("input[name=nomorPengirim]").val();

  var penerima1 = $("input[name=penerima1]").val();
  var penerima2 = $("input[name=penerima2]").val();
  var penerima3 = $("input[name=penerima3]").val();

  var nomor1 = $("input[name=nomor1]").val();
  var nomor2 = $("input[name=nomor2]").val();
  var nomor3 = $("input[name=nomor3]").val();

  var alamat1 = $("textarea[name=alamat1]").val();
  var alamat2 = $("textarea[name=alamat2]").val();
  var alamat3 = $("textarea[name=alamat3]").val();

  var list = []

  if (penerima1 !== "") {
    list.push({
      penerima: penerima1,
      nomor: nomor1,
      alamat: alamat1,
      pengirim,
      nomorPengirim,
    })
  }

  if (penerima2 !== "") {
    list.push({
      penerima: penerima2,
      nomor: nomor2,
      alamat: alamat2,
      pengirim,
      nomorPengirim,
    })
  }

  if (penerima3 !== "") {
    list.push({
      penerima: penerima3,
      nomor: nomor3,
      alamat: alamat3,
      pengirim,
      nomorPengirim,
    })
  }

  pdfkit.generate(list)
    .then((val) => {
      console.log(val);
      $("#loading").hide();
    })
}

$("#generate").on("click", generatePdf);

// On ready
$(document).ready(() => {
  $("#loading").hide();
});