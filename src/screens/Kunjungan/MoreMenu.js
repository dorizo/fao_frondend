// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

export default function MoreMenu({ handleOnDelete, handleOnUpdate }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={() => {
            handleOnUpdate();
            setIsOpen(false);
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Check Out" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleOnDelete();
            setIsOpen(false);
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
MoreMenu.propTypes = {
  handleOnDelete: PropTypes.func,
  handleOnUpdate: PropTypes.func,
};
