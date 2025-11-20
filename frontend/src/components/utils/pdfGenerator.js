import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { logoBase64 } from '/src/assets/logoBase64';

export const generateEmpresaPDF = (empresa) => {
  const doc = new jsPDF();
  
  // Encabezado
  doc.setFontSize(12);
  doc.addImage(logoBase64, 'JPEG', 12, 8, 33, 33);
  doc.text('Corporacion Autonoma Regional de los Valles de Sinu y San Jorge', 14, 43);
  doc.text('Reporte de Inscripcion Departamento de Gestion Ambiental -DGA', 14, 48);
  doc.text('____________________________________________________________________________', 14, 49);
  doc.setFontSize(10);
  doc.text('Consultada la base de datos correspondiente al registro de Departamentos de Gestion Ambiental -DGA,', 14, 55);
  doc.text('se encontro inscrito en esta corporación, el siguiente establecimiento :', 14, 59);

  // Datos de la empresa
  const tableData = [
    ['NIT', empresa.nit],
    ['Razón Social', empresa.razon_social],
    ['Dirección', empresa.direccion],
    ['Municipio', empresa.municipio.nombre],
    ['Latitud:', empresa.latitud],
    ['Longitud', empresa.longitud],
    ['Codig CIIU', empresa.codigo_ciiu],
    ['Camara Comercio', empresa.camara_comercio],
    ['Nombre Representante Legal', empresa.nombre_representante_legal],
    ['Cédula Representante Legal', empresa.cedula_representante_legal],
    ['Sector Productivo', empresa.sector_productivo],
    ['Pagina Web', empresa.pagina_web],
    ['Email', empresa.email],
    ['Telefono', empresa.telefono],
    ['Tipo DGA', empresa.tipo_departamento],
    ['Nombre Encargado DGA', empresa.nombre_encargado],
    ['Profesion', empresa.profesion],
    ['Cargo', empresa.cargo],
    ['Email Encargado DGA', empresa.email_encargado],
    ['Fecha Creacion DGA', empresa.fecha_creacion],
  ];

  autoTable(doc, {
    head: [['Atributo', 'Valor']],
    body: tableData,
    startY: 62,
    theme: 'grid',
  });

  return doc;
};