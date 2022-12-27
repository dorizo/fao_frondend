import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { GET_ALL_KATEGORI_SAMPAH } from '../../api/kategori_sampah';
import useScriptRef from '../../hooks/useScriptRef';
import SelectInput from '../../components/SelectInput';

export default function DialogComponent(props) {
  const { open, onClose, item, onAdd, onUpdate, processing } = props;
  const editMode = Boolean(item && item.jsCode);
  const scriptedRef = useScriptRef();
  const [kategoriOption, setKategoriOption] = useState([]);
  const handleSubmit = (values, { setErrors, setStatus, setSubmitting }) => {
    try {
      if (item && item.jsCode) {
        onUpdate({ ...values }, item.jsCode, setErrors);
      } else {
        onAdd(values, setErrors);
      }
    } catch (err) {
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };

  async function getKat() {
    GET_ALL_KATEGORI_SAMPAH()
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            return { value: p.ksCode, label: p.kategori };
          });
        setKategoriOption(list);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const formik = useFormik({
    initialValues: {
      jenis: item ? item.jenis : '',
      ksCode: item ? item.ksCode : '',
    },
    validationSchema: Yup.object({
      jenis: Yup.string().required('Harus Disisi'),
      ksCode: Yup.number().required('Harus Disisi'),
    }),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getKat();
  }, []);

  return (
    <div>
      <Dialog fullWidth maxWidth="sm" open={open}>
        <DialogTitle> {editMode ? 'Edit' : 'Tambah'} Jenis Sampah</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              name="jenis"
              id="jenis"
              label="Jenis Sampah"
              type="text"
              disabled={processing}
              value={formik.values.jenis}
              onChange={formik.handleChange}
              fullWidth
              error={formik.touched.jenis && Boolean(formik.errors.jenis)}
              variant="standard"
              helperText={formik.touched.jenis && formik.errors.jenis}
            />

            <SelectInput
              label={'Kategori'}
              name="ksCode"
              id="ksCode"
              value={formik.values.ksCode}
              onChange={formik.handleChange}
              option={kategoriOption}
              error={formik.touched.ksCode && Boolean(formik.errors.ksCode)}
            />
          </DialogContent>
          <DialogActions>
            <Button disabled={processing} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={processing}>
              {editMode ? 'Edit' : 'Tambah'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
DialogComponent.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  item: PropTypes.any,
  onAdd: PropTypes.any,
  onUpdate: PropTypes.any,
  processing: PropTypes.any,
};
