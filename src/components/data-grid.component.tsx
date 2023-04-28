import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef, GridToolbar, gridClasses, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { alpha, styled } from '@mui/material/styles';
import './data-grid.style.scss';
import Button from '@mui/material/Button';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    
    [`.MuiDataGrid-toolbarContainer`]: {
        backgroundColor: '#F4F6F9'
    },
    [`.MuiDataGrid-columnHeaders`]: {
        backgroundColor: '#F4F6F9'
    },
    [`& .${gridClasses.row}.odd`]: {
    backgroundColor: '#F4F6F9',
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <Button variant="contained" color="primary">
        My Button
      </Button>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}
export interface IListViewProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    onPageChange: (params: any) => void;
}

export interface IListViewState {
}

export default class ListView extends React.Component<IListViewProps, IListViewState> {
  constructor(props: IListViewProps) {
    super(props);

    this.state = {
    }
  }

  public render() {
    const { rows, columns, onPageChange } = this.props;
    const onFilterChange = (dasd:any) => {
      console.log(dasd)
    };
    const handleEvent = (event:any) => {
      console.log(event)
    }
    return (
        <div style={{ height: '70vh', width: '100%' }} className='data-grid-container'>
            <StripedDataGrid 
            rows={rows} 
            columns={columns} 
            onPaginationModelChange={onPageChange}
            initialState={{
                pagination: {
                  paginationModel: { pageSize: 20 },
                },
            }}
            pageSizeOptions={[20, 30, 50]}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            checkboxSelection
            // slots={{ toolbar: GridToolbar }}
            // slotProps={{
            //     toolbar: {
            //       showQuickFilter: true,
            //     },

            // }}
            onRowClick={handleEvent}
            onFilterModelChange={onFilterChange}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            // components={{
            //   Toolbar: CustomToolbar,
            // }}
            />
        </div>
    );
  }
}
