import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import HomeScreen from './screens/HomeScreen';
import 'react-toastify/dist/ReactToastify.css';
import ProductScreen from './screens/ProductScreen';
import { useContext, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import Button from 'react-bootstrap/Button';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import DashboardScreen from './screens/DashboardScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdb-react-ui-kit';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>TaraShop</Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle aria-controls="baisc-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <SearchBox />
                <Nav className="me-auto w-100 justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Team Name</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{
                    pathname: '/search',
                    hash: '#hash',
                    search: `?category=${category}`,
                  }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
        <main>
          <Container>
            <Routes>
              <Route path="/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SigninScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/shipping"
                element={<ShippingAddressScreen />}
              ></Route>

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UserListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/product/id/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/admin/user/:id"
                element={
                  <AdminRoute>
                    <UserEditScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <MDBFooter
          bgColor="black"
          className="text-center text-lg-start text-muted"
        >
          <section className="">
            <MDBContainer className="text-center text-md-start mt-5">
              <MDBRow className="mt-3">
                <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    <MDBIcon color="white" icon="gem" className="me-3" />
                    TaraShop
                  </h6>
                  <p>
                    TaraShop is an electronic sales website specializing in
                    selling all kinds of football clothes of famous teams in the
                    world
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">
                    UserFull Links
                  </h6>
                  <p>
                    <a href="/" className="text-reset">
                      Home
                    </a>
                  </p>
                  <p>
                    <a href="/cart" className="text-reset">
                      Cart
                    </a>
                  </p>
                  <p>
                    <a href="/profile" className="text-reset">
                      User Profile
                    </a>
                  </p>
                  <p>
                    <a href="/orderhistory" className="text-reset">
                      Order history
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <MDBIcon color="secondary" icon="home" className="me-2" />
                    So Tai, Thanh Phu, Cai Nuoc, Ca Mau
                  </p>
                  <p>
                    <MDBIcon
                      color="secondary"
                      icon="envelope"
                      className="me-3"
                    />
                    tranquanvinh001@gmail.com
                  </p>

                  <p>
                    <MDBIcon color="secondary" icon="phone" className="me-3" />{' '}
                    + 84 234 567 88
                  </p>
                  <p>
                    <a
                      href="https://www.facebook.com/XiaoJihun/"
                      className="text-reset "
                    >
                      <MDBIcon
                        color="secondary"
                        fab
                        icon="facebook-f"
                        className="me-3"
                      />
                      Facebook
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.instagram.com/quan.vinh.71697/"
                      className="text-reset "
                    >
                      <MDBIcon
                        color="secondary"
                        fab
                        icon="instagram"
                        className="me-3"
                      />
                      Instagram
                    </a>
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>

          <div
            className="text-center p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
          >
            © 2021 Copyright:
            <a className="text-reset fw-bold">TaraShop</a>
          </div>
        </MDBFooter>
      </div>
    </BrowserRouter>
  );
}
export default App;
